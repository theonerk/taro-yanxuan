import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import rightArrow from './assets/right-arrow.png'
import './index.scss'

export default class InfoBase extends Component {
  static defaultProps = {
    product: {}
  }

  render () {
    const { product } = this.props 
    
    return (
      <View className='item-info-base'>
        <View className='item-info-base__header'>
          <View className='item-info-base__header-wrap'>
            <Text className='item-info-base__header-name'>{product.name}</Text>
            <Text className='item-info-base__header-desc'>{product.desc}</Text>
          </View>
          <View className='item-info-base__header-star'>
            <Text className='item-info-base__header-star-txt'>
              {/*`${parseFloat(itemStar.goodCmtRate) || 0}%` */}100%
            </Text>
            <Text className='item-info-base__header-star-link'>{'好评率>'}</Text>
          </View>
        </View>

        <View className='item-info-base__price'> 
          <Text className='item-info-base__price-txt'>
           促销价:¥{ product.retail_price }
          </Text>
          
          <Text className='item-info-base__price-origin'>
            原价:¥{product.activity_price}
          </Text>
          
          
        </View>

        { /* !!tagList.length &&
          <View className='item-info-base__tag'>
            {tagList.map(item => (
              <View key={item.id} className='item-info-base__tag-item'>
                <Text className='item-info-base__tag-item-txt'>{item.tagName}</Text>
                <Image className='item-info-base__tag-item-img' src={rightArrow} />
              </View>
            ))}
          </View>
        */ }
      </View>
    )
  }
}
