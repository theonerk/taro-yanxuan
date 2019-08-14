import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import Gallery from './gallery'
import InfoBase from './info-base'
import Footer from './footer'
import * as actions from '@actions/product'
import { getWindowHeight } from '@utils/style'

@connect(state => state.product, { ...actions })
class Product extends Component {
config = {
    navigationBarTitleText: '详情页'
}
 constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {}
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
            </ScrollView>   
            <View className='item__footer'>
             <Footer onAdd={this.handleAdd} />
            </View>
           </View>
      )
      }
 }

}

export default Product