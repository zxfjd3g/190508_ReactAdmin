/* 
用于根据现有的老state和指定的action, 产生并返回一个新的state的函数
*/

import {
  INCREMENT,
  DECREMENT
} from './action-types'

/* 
管理count状态数据的reducer函数
*/
export default function count(state = 1, action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.number
      break;
    case DECREMENT:
      return state - action.number
      break;
  
    default: // 返回初始值
      return state
      break;
  }
}