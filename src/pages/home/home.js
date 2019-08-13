import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { dispatchCartNum } from '@actions/cart'
import { dispatchProducts } from "@actions/product"
import { getWindowHeight } from '@utils/style'
import Banner from './banner'
import Policy from './policy'
//import Pin from './pin'
//import Operation from './operation'
//import Manufactory from './manufactory'
//import FlashSale from './flash-sale'
//import Popular from './popular'
//import Category from './category'
//import Recommend from './recommend'
import  Lottery from './lottery'
//import searchIcon from './assets/search.png'
import './home.scss'

const RECOMMEND_SIZE = 20

@connect(state => state.home, { ...actions, dispatchCartNum,dispatchProducts })
class Home extends Component {
  config = {
    navigationBarTitleText: '低价严选'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true,
   
  }

  componentDidMount() {
    // NOTE 暂时去掉不适配的内容 
    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    this.props.dispatchCartNum()
    this.props.dispatchSearchCount()
    this.props.dispatchPin({ orderType: 4, size: 12 })
    this.loadRecommend()
    this.props.dispatchProducts();
  }

  loadRecommend = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }

    const payload = {
      lastItemId: this.state.lastItemId,
      size: RECOMMEND_SIZE
    }
    this.setState({ loading: true })
    this.props.dispatchRecommend(payload).then((res) => {
      const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1]
      this.setState({
        loading: false,
        hasMore: res.hasMore,
        lastItemId: lastItem && lastItem.id
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }

    const { homeInfo ,recommend,products } = this.props
   
    
    return (
      <View className='home'>  
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={homeInfo.focus} />
            <Policy list={homeInfo.policyDesc} />  
          </View>

          {/* 为你推荐 */}
          {/*< Recommend list={recommend}  /> */}
          <Lottery list={products} />
          {this.state.loading &&
            <View className='home__loading'>
              <Text className='home__loading-txt'>正在加载中...</Text>
            </View>
          }
          {!this.state.hasMore &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>更多内容，敬请期待</Text>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home
