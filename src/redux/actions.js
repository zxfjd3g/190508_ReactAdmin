/* 
包含n个用于生成action对象的工厂函数(action creator)的模块
同步action: action对象
异步action: action函数(函数接收dispatch参数)
*/

import {
  INCREMENT,
  DECREMENT
} from './action-types'

/* 
增加的同步action
*/
export const increment = number => ({type: INCREMENT, number})

/* 
减少的同步action
*/
export const decrement = number => ({type: DECREMENT, number})


/* 
增加的异步action
*/
export function incrementAsync(number) {
  return dispatch => {
    // 1. 执行异步代码
    setTimeout(() => {
      // 2. 有结果后, 分发同步action
      dispatch(increment(number))
    }, 1000);
    
  }
}

/* export const incrementAsync = number => disptch => {

} */