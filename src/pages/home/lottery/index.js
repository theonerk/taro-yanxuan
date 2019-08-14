import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
 
import './index.scss'

export default class Lottery extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (id) => {   
    Taro.navigateTo({ 
      url: `/pages/product/product?productId=${id}`
      //url: `/pages/item/item?itemId=3402020`
    })
  }

  render () {
    const { list } = this.props
    console.log("list:",list);
    
    return (
      <View className='home-recommend'>
        <View className='home-recommend__title'>
          <Text className='home-recommend__title-txt'>今日最佳</Text>
        </View>
        <View className='home-recommend__list'>
         {list.map(item => ( 
         
           <View
             key={item.id}
             className='home-recommend__list-item'
             onClick={this.handleClick.bind(this, item.id)}
           >
            <Image className='home-recommend__list-item-img' src={item.picture} />
             <Text className='home-recommend__list-item-name'  >
                    {item.name} 
             </Text>
              <Text className='home-recommend__list-item-desc'  >
                    {item.desc} 
             </Text> 
              <Text className='home-recommend__list-item-price'  >
                    市场价：{item.retail_price}  
             </Text> 
              <Text className='home-recommend__list-item-price'  >
                   促销价：{item.activity_price}
             </Text> 
              <Text className='home-recommend__list-item-price'  >
                   活动参与价：{item.lottery_price}
             </Text> 
              <Text className='home-recommend__list-item-price'  >
             </Text> 
            </View>
            
         ))}
        </View>
      </View>
    )
  }
}
