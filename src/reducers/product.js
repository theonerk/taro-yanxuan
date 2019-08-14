import { PRODUCT_LIST,PRODUCT_GET_BY_ID,PRODUCT_CLEAR } from '@constants/product'

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
    case PRODUCT_GET_BY_ID: {  
      return {
        ...state,
        products:{
          ...action.payload
        }
      }
    }
    case PRODUCT_CLEAR: {
      return {
        ...INITIAL_STATE
      }
    }
    default:
      return state  
}}
