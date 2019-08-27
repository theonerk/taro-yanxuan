import Taro, { Component } from '@tarojs/taro'
import { ButtonItem } from '@components'
import * as actions from '@actions/user'
import { connect } from '@tarojs/redux'
 
@connect(state => state.user, { ...actions })
export default class AUth extends Component {
  agreeAuth = () => {
    Taro.login().then((response) => { 
      const { errMsg, code } = response 
      if(errMsg === 'login:ok'){ 
        Taro.getUserInfo().then((res) => {
        const {   userInfo,iv,encryptedData } = res 
        
        if (res.errMsg === 'getUserInfo:ok') {
          const payload = {
            iv: iv,
            encryptedData:encryptedData,
            code: code
          } 
          this.props.dispatchLogin_Real(payload).then(() =>{
                
              Taro.showToast({
              title: `欢迎: ${userInfo.nickName}！`,
              icon: 'none'
              })
              Taro.navigateBack({ delta: 1})
           }
           ).catch(() => {
              Taro.showToast({
              title: `登录失败`,
              icon: 'none'
              })
            });
                  
        } else {
          Taro.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
       })
      }
        
         
        })

    
  }

  render () {
    return (
      <ButtonItem
        type='primary'
        text='微信登录'
        openType='getUserInfo'
        onGetUserInfo={this.agreeAuth}
      />
    )
  }
}
