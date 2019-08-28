import { connect } from '@tarojs/redux'
import * as actions from '@actions/order'
import { AtInput , AtTimeline , AtModal, AtModalHeader, AtModalContent, AtModalAction,AtButton }  from 'taro-ui'

import { checkNumbers,convertMoney } from '@utils/helper'
import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import {ButtonItem } from '@components'
import './index.scss'



@connect(state => state.order, { ...actions })
export default class DoLottery extends Component {
  static defaultProps = {
    product: {}, 
  }
  state = {
    amount: 0, 
    loading: false,  
    isBtnDisabled:false,
    lottery_price:0,
    message:'',
    items:[] 
    
  }
 componentDidMount() {  
    const { product } = this.props 
    this.setState({isBtnDisabled:true}); 
    if(product.lottery_price)
    {
      this.setState({amount:product.lottery_price})
      this.setState({isBtnDisabled:false})
      this.setState({lottery_price:product.lottery_price})
    } 
    const {lotteryList} = this.props;
    this.setState(lotteryList);
   
    
  }
  componentWillUnmount() {
     this.setState({message:''})
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
  this.props.onLottryPay(payload).then((result) =>{
    console.log('result:',result); 
    let newItem = {};
    newItem.title = '刚刚' + '  ' + convertMoney(result.amount)+'元  '+ checkNumbers(result.number);
    let items = this.state.items;
    items.push(newItem);
    this.setState(items);       
    if(result.number && result.number>1)
    {
      this.setState({message:'已经有人和你出价相同，建议再出价！'})
    }
    else
    {
       this.setState({message:'当前您是此价格唯一拥有者！'})
    }
    this.setState({ loading: false })
    Taro.showToast({
      title: `成功！`,
      icon: 'none'
    }) 
  }).catch((error) => {
    console.log(error);
    let errorTitle="请求失败，稍后再试！"
    if(error.code =='401')
    {errorTitle="请登录后再试!";}
    this.setState({ loading: false })
    Taro.showToast({
      title: errorTitle,
      icon: 'none'
      })
    }
  );  
}
 
render () { 
   const {timeLineItems } = this.props;  
   this.setState({items:timeLineItems});
   
  return (
    <View className='user-lottery'>
      <View className='user-lottery__wrap'> 
          <Text className='item-info-base__header-name'>请输入你的出价(大于 {this.state.lottery_price} 元)：</Text>  
            <AtInput
              value={this.state.amount}
              type='digit' 
              placeholder='出价'
              onChange={this.handleInput.bind(this, 'amount')}
            /> 
      </View>
     <View className='user-lottery_btn'>
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
     <Text>{this.state.message}</Text>
    <AtModal isOpened>
  <AtModalHeader>标题</AtModalHeader>
  <AtModalContent>
   <AtTimeline  
     items={this.state.items}
   >
  </AtTimeline>
  </AtModalContent>
  <AtModalAction> <AtButton>取消</AtButton> <AtButton>确定</AtButton> </AtModalAction>
</AtModal>
    
     
      
      </View>
    )
  }
}
