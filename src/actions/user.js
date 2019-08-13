import {  USER_LOGOUT,USER_REAL_LOGIN,USER_PROFILE } from '@constants/user'
import { API_USER_WeChat_LOGIN,API_USER_RROFILE } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchUser = payload => createAction({
  url: API_USER_RROFILE,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: USER_PROFILE,
  payload
})



 
/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin_Real = payload => createAction({
  url: API_USER_WeChat_LOGIN,
  type: USER_REAL_LOGIN,
  method:'POST',
  payload
})



/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })
