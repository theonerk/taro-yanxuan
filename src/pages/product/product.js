import * as actions from '@actions/product'
 
import { onLotteryGetByProductId,onLottryPay } from '@actions/lottery'
import { getWindowHeight } from '@utils/style'
import { AtInput , AtFloatLayout,AtButton,AtModal,AtModalHeader,AtModalContent,AtTimeline }  from 'taro-ui'
import {  View, Text, ScrollView } from '@tarojs/components'
import { convertTime,checkNumbers,convertMoney } from '@utils/helper'

import Taro, { Component } from '@tarojs/taro'

//import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import Gallery from './gallery'
import InfoBase from './info-base'
//import DoLottery from './lottery'
import Footer from './footer' 



@connect(state => state.product, { onLotteryGetByProductId,onLottryPay,...actions })
class Product extends Component {
config = {
    navigationBarTitleText: '详情页'
}
 constructor(props) {
    super(props)
    this.state = {
      loaded: false, 
      isFloatLayoutOpened:false,
      timeLineItems:[],
      isBtnDisabled:true,
      amount:0,
      isLotteryHistoryShow:false
     
    }
    this.productId = parseInt(this.$router.params.productId)
     
}
 componentDidMount() {
   Taro.showShareMenu()
   const { products } = this.props 
   const product = products[0]
    if(product.lottery_price)
    {
      this.setState({amount:product.lottery_price})
      this.setState({isBtnDisabled:false}) 
    } 
    
  }
handleAdd = () => {
     console.log('handleAdd:');
     
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

handleFloatLayoutChange (flag) {
   
   console.log("flag:",flag);
    if(flag)
    {
       this.setState({isLotteryHistoryShow:false})
    }
    if(flag && !this.state.loaded)
    {
      console.log("try to get lottery history");
      
      const payload = {
            productId:  this.productId
          }
      this.props.onLotteryGetByProductId(payload).then((lotteryList)=>{
        let timeLineItems=[];
        if(lotteryList)
        { 
          lotteryList.forEach(lottery => {
            let item = {};
            item.title = convertTime(lottery.createdAt) + '  ' + convertMoney(lottery.amount)+'元  '+ checkNumbers(lottery.number);
            if(parseInt(lottery.number)<2)
            {
              item.icon='check'
              }
            else{
              item.icon='close'
              item.color='red'
            }
            console.log('item:',item);
            
            timeLineItems.push(item);
          }); 
          this.setState({timeLineItems:timeLineItems})
          
        }  
        this.setState({loaded:true});
        this.setState({ isFloatLayoutOpened: flag })
      }).catch((err)=>{
        console.log("err:",err);
        
      }) 
    }
   else
   {
      this.setState({ isFloatLayoutOpened: flag })
   } 
   
  };

handleLottery=()=>{
  console.log('this.state.amount:',this.state.amount);
  const { products } = this.props 
  const product = products[0]
  const { amount } = this.state
  const payload = {
            productId: product.id, 
            amount: amount*100
          }
  this.setState({ loading: true })
  this.props.onLottryPay(payload).then((result) =>{
    console.log('result:',result); 
    let newItem = {};
    newItem.title = '刚刚' + '  ' + convertMoney(result.amount)+'元  '+ checkNumbers(result.number);
    let items = this.state.timeLineItems;
    items.push(newItem);
    this.setState({timeLineItems:items});       
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
handleShowLotteryHistory=(isShow)=>{
  this.setState({isLotteryHistoryShow:isShow})
  this.setState({ isFloatLayoutOpened: false })
}

render () {
    const { products } = this.props
    const product = products[0]
    const height = getWindowHeight(false)
    if(products[0])
    {
      const gallery = [
      product.picture 
    ] 
      return (
           <View className=' '>
           <ScrollView
             scrollY
             className=''
             style={{ height }}
           >
           <Gallery list={gallery} />
          
           <InfoBase product={product} />
            
          <AtFloatLayout 
            title='输入您的出价'
            isOpened={this.state.isFloatLayoutOpened}
            onClose={this.handleFloatLayoutChange.bind(this, false)}
            className='view_price'
          >
          <View >
               <AtInput
                 value={this.state.amount}
                 type='digit'
                 title='出价' 
                 placeholder='出价'
                 onChange={this.handleInput.bind(this, 'amount')}
               /> 
          </View>
          <View className='at-row'>
            <View className='at-col'>
             <AtButton  
               onClick={this.handleShowLotteryHistory.bind(this,true)}
               onClose={this.handleShowLotteryHistory.bind(this,false)}
             >
          历史出价
          </AtButton></View>
            <View className='at-col'>
             <AtButton  
               type='primary'
               disabled={this.state.isBtnDisabled}
               loading={this.state.loading}
               onClick={this.handleLottery.bind(this)}
             >
          出价
          </AtButton></View>
            
          </View> 
           <Text>{this.state.message}</Text>
            
         </AtFloatLayout> 
         <AtModal isOpened={this.state.isLotteryHistoryShow}>
            <AtModalHeader>历史出价</AtModalHeader>
            <AtModalContent>
            <AtTimeline  
              items={this.state.timeLineItems}
            >
            </AtTimeline>
            </AtModalContent>
          </AtModal>
            </ScrollView>   
            <View className='item__footer'>
             <Footer onAdd={this.handleFloatLayoutChange.bind(this, true)} />
            </View>
           </View>
      )
      }
 }

}

export default Product