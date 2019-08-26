import { LOTTERY_PAY,LOTTERY_GET } from '@constants/lottery'

const INITIAL_STATE = {
  orders: {}  
}

export default function order(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOTTERY_PAY: {  
      return {
        ...state,
        orders:{
          ...action.payload
        }
      }
    }
    case LOTTERY_GET: {  
      return {
        ...state,
        orders:{
          ...action.payload
        }
      }
    } 
    default:
      return state  
}}
