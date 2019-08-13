import { PRODUCT_LIST} from '@constants/product'
import { API_PRODUCTS } from '@constants/api'
import { createAction } from '@utils/redux'


/**
 * 产品数据
 * @param {*} payload
 */ 
export const dispatchProducts = payload => createAction({
  url: API_PRODUCTS,
  type: PRODUCT_LIST,
  payload
})


export const dispatchProductDetail = payload => createAction({
  url: API_PRODUCTS,
  type: PRODUCT_LIST,
  payload
})





