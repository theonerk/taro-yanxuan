import { PRODUCT_LIST,PRODUCT_GET_BY_ID} from '@constants/product'
import { API_PRODUCTS,API_PRODUCT_DETAIL } from '@constants/api'
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
  url: API_PRODUCT_DETAIL+`/`+payload.productId,
  type: PRODUCT_GET_BY_ID,
  payload
})





