import Taro from '@tarojs/taro'
import { API_USER, API_USER_LOGIN,API_USER_WeChat_LOGIN } from '@constants/api'

const CODE_SUCCESS = '200'
const CODE_AUTH_EXPIRED = '401'

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    Taro.setStorage({ key: 'session', data: data['session'] || '' }),
    Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
  ])
}

function updateSession(data = {}) {
  return Promise.all([ 
    Taro.setStorage({ key: 'session', data: data.data.session || '' })
  ])
}
/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const session = await getStorage('session')
  const header = session ? { 'WX-PIN-SESSION': session, 'X-WX-3RD-Session': session } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  
  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {  
    const { code, data } = res.data
    const {statusCode} = res
   // console.log(res);
   // console.log("statusCode:",statusCode);
    if (code !== CODE_SUCCESS && statusCode !== 200) {
    //  console.log("got error code");
      
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    if (url === API_USER_LOGIN) {
      await updateStorage(data)
    }

    if (url === API_USER_WeChat_LOGIN) { 
      console.log("res.data:",res.data);
      
      await updateSession(res.data)
    }

    // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
    if (url === API_USER) {
      const uid = await getStorage('uid')
      return { ...data, uid }
    }

    return data
  }).catch((err) => {
    console.log("err:",err);
    
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
