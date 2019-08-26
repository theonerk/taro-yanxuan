import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import {ButtonItem, InputItem } from '@components'
import './index.scss'

export default class DoLottery extends Component {
  static defaultProps = {
    product: {}
  }
   state = {
    amount: 0, 
    loading: false
  }
handleInput = (key, value) => {
    this.setState({ [key]: value })
     
  }
  render () {
    const { product } = this.props
    const {amount, loading}  = this.state
    const isBtnDisabled = !amount 
    return (
      <View className='user-login-email'>
        <View className='user-login-email__wrap'> 
            <Text className='item-info-base__header-name'>请输入你的出价(> {product.lottery_price} 元)：</Text>  
           <InputItem
             value={amount}
             placeholder='出价'
             onInput={this.handleInput.bind(this, 'amount')}
           />
        </View>
     <View className='user-login-email__btn'>
         <ButtonItem
           text='出价'
           disabled={isBtnDisabled}
           loading={loading}
           onClick={this.handleLogin}
           compStyle={{
              background: '#b59f7b',
              borderRadius: Taro.pxTransform(4)
            }}
           textStyle={{
              color: isBtnDisabled ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'
            }}
         />
     </View>
       
      </View>
    )
  }
}
