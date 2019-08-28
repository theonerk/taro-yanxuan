import * as actions from '@actions/product'
import { onLotteryGetByProductId } from '@actions/order'
import { getWindowHeight } from '@utils/style'
import { convertTime,checkNumbers } from '@utils/helper'
import { AtFloatLayout } from "taro-ui"
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
//import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import Gallery from './gallery'
import InfoBase from './info-base'
import DoLottery from './lottery'
import Footer from './footer' 



@connect(state => state.product, { onLotteryGetByProductId,...actions })
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
    }
    this.productId = parseInt(this.$router.params.productId)
     
}
 componentDidMount() {
    console.log('this.productId: ',this.productId );  
  }
handleAdd = () => {
     console.log('handleAdd:');
     
}

handleFloatLayoutChange (flag) {
   
   console.log("flag:",flag);
   
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
            item.title = convertTime(lottery.createdAt) + '  ' + lottery.amount+'  '+ checkNumbers(lottery.number);
            timeLineItems.push(item);
          }); 
          this.setState({timeLineItems:timeLineItems})
          
        }
   
        this.setState({ lotteryList });
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
           <View className='item'>
           <ScrollView
             scrollY
             className='item__wrap'
             style={{ height }}
           >
           <Gallery list={gallery} />
           <InfoBase product={product} />
            
          <AtFloatLayout
            title='输入您的出价'
            isOpened={this.state.isFloatLayoutOpened}
            onClose={this.handleFloatLayoutChange.bind(this, false)}
          >
            <View className='content-wrapper'>
             <DoLottery product={product} isActive={this.state.isFloatLayoutOpened}
               lotteryList={this.state.lotteryList}
               timeLineItems={this.state.timeLineItems}
             />
            </View>
          </AtFloatLayout>
           
          
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