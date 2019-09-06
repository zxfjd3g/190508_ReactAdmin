/* 
包含n个action creator函数的模块
*/

import { 
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_MSG,
  LOGOUT
} from "./action-types"
import { reqLogin } from '../api'
import storageUtils from "../utils/storageUtils";

/* 
设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, data: headerTitle})

/* 
接收用户的同步action
*/
const receiveUser = (user) => ({ type: RECEIVE_USER, user})

/* 
显示错误信息的同步action
*/
const showMsg = (msg) => ({ type: SHOW_MSG, msg})

/* 
退出登陆的同步action
*/
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  
  return ({type: LOGOUT})
}

/* 
登陆的异步action
*/
export function login({username, password}) {
  
  return async dispatch => {
    // 1. 执行异步ajax请求
    const result = await reqLogin(username, password)
    // 2. 有了结果后, 分发同步action
    if (result.status===0) { // 登陆成功
      const user = result.data
      // 将user保存local
      storageUtils.saveUser(user)
      // 分发接收user的同步action
      dispatch(receiveUser(user))
    } else { // 登陆失败
      dispatch(showMsg(result.msg))
    }
  }
}