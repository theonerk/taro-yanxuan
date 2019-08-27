import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import {ButtonItem, InputItem } from '@components'
import './index.scss'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/order'
import { AtInput }  from 'taro-ui'

@connect(state => state.order, { ...actions })
export default class DoLottery extends Component {
  static defaultProps = {
    product: {}, 
  }
  state = {
    amount: 0, 
    loading: false,  
    isBtnDisabled:false 
  }
 componentDidMount() {  
    const { product } = this.props 
    this.setState({isBtnDisabled:true}); 
    if(product.lottery_price)
    {
      this.setState({amount:product.lottery_price})
      this.setState({isBtnDisabled:false})
    } 
  }
handleInput = (key, value) => { 
    value = value.replace(/[^\d\.]/g, "");
    value = value.replace(/^\./g, "");
    value = value.replace(/\.{2,}/g, ".");
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');  
    const isValidAmount = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(value); 
    if(isValidAmount)
    {  
      console.log("changes");
      this.setState({isBtnDisabled:false}); 
      this.setState({amount:value});
      return value;
    } 
  }
handleLottery=()=>{
  console.log('this.state.amount:',this.state.amount);
   const { product } = this.props
   const { amount } = this.state
   const payload = {
            productId: product.id,
            orderType:2,
            amount: amount*100
          }
  this.setState({ loading: true })
  this.props.onLottryPay(payload).then(() =>{
            this.setState({ loading: false })
              Taro.showToast({
              title: `成功！`,
              icon: 'none'
              }) 
             
           }).catch(
             () => {
             this.setState({ loading: false })
              Taro.showToast({
              title: `失败`,
              icon: 'none'
              })
            }
           ); 

}
 
render () {
   
    return (
      <View className='user-login-email'>
        <View className='user-login-email__wrap'> 
            <Text className='item-info-base__header-name'>请输入你的出价(大于 {product.lottery_price} 元)：</Text>  
           
            <AtInput
              value={this.state.amount}
              type='digit' 
              placeholder='出价'
              onChange={this.handleInput.bind(this, 'amount')}
            /> 
        </View>
     <View className='user-login-email__btn'>
         <ButtonItem
           text='出价'
           disabled={this.state.isBtnDisabled}
           loading={this.state.loading}
           onClick={this.handleLottery}
           compStyle={{
              background: '#b59f7b',
              borderRadius: Taro.pxTransform(4)
            }}
           textStyle={{
              color: this.state.isBtnDisabled ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'
            }}
         />
     </View>
       
      </View>
    )
  }
}
