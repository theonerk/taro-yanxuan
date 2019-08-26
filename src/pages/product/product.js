import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
//import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import Gallery from './gallery'
import InfoBase from './info-base'
import DoLottery from './lottery'
import Footer from './footer'
import * as actions from '@actions/product'
import { getWindowHeight } from '@utils/style'
import { AtFloatLayout } from "taro-ui"


@connect(state => state.product, { ...actions })
class Product extends Component {
config = {
    navigationBarTitleText: '详情页'
}
 constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {},
      isFloatLayoutOpened:false,
    }
    this.productId = parseInt(this.$router.params.productId)
     
}
 componentDidMount() {
    console.log('this.productId: ',this.productId );
    
    this.props.dispatchProductDetail({ productId: this.productId }).then(() => {
      this.setState({ loaded: true })
    })
  }
   handleAdd = () => {
     console.log('handleAdd:');
     
   }
handleFloatLayoutChange (flag) {
    this.setState({
      isFloatLayoutOpened: flag
    })
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
             <DoLottery product={product}  />
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