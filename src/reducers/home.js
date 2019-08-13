import {
  HOME_INFO, HOME_SEARCH_COUNT, HOME_RECOMMEND, HOME_PIN
} from '@constants/home'
import { PRODUCT_LIST } from '@constants/product'

const INITIAL_STATE = {
  homeInfo: {},
  searchCount: 0,
  pin: [],
  recommend: [],
  products:[]
}

export default function home(state = INITIAL_STATE, action) {
  switch(action.type) {
    case HOME_INFO: {
      return {
        ...state,
        homeInfo: action.payload
      }
    }
    case HOME_SEARCH_COUNT: {
      return {
        ...state,
        searchCount: action.payload.count
      }
    }
    case HOME_PIN: {
      
      const pin = []
      action.payload.forEach((item, index) => {
        const groupIndex = parseInt(index / 3)
        if (!pin[groupIndex]) {
          pin[groupIndex] = []
        }
        pin[groupIndex].push(item)
      })
      return { ...state, pin }
    }
     case PRODUCT_LIST: {  
      return {
        ...state,
        products:{
          ...action.payload
        }
      }
    }
    case HOME_RECOMMEND: {
      return {
        ...state,
        recommend: state.recommend.concat(action.payload.rcmdItemList)
      }
    }
    default:
      return state
  }
}
