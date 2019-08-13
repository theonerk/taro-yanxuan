import { USER_PROFILE, USER_LOGOUT,USER_REAL_LOGIN } from '@constants/user'

const INITIAL_STATE = {
  userInfo: {},
  session:''
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_PROFILE: {
      return {
        ...state,
        userInfo: {
          ...action.payload,
          login: true
        }
      }
    } 
    
    case USER_REAL_LOGIN:{   
      return { ...state,
              userInfo:{
                ...action.payload,
                login:true
              }}
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      }
    }
    default:
      return state
  }
}
