import { PRODUCT_LIST } from '@constants/product'

const INITIAL_STATE = {
  products: {}  
}


export default function product(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PRODUCT_LIST: {  
      return {
        ...state,
        products:{
          ...action.payload
        }
      }
    }
    default:
      return state  
}}
