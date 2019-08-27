import {  LOTTERY_PAY,LOTTERY_GET} from '@constants/lottery'
import { API_LOTTERY_PAY,API_LOTTERY_GEY } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * lottery for one product
 * @param {*} payload
 */
export const onLottryPay = payload => createAction({
  url: API_LOTTERY_PAY, 
  method:'POST',
  type: LOTTERY_PAY,
  payload
})

/**
 * get lottery record
 * @param {*} payload
 */
export const getLottery = payload => createAction({
  url: API_LOTTERY_GEY,
  type: LOTTERY_GET, 
  payload
})
