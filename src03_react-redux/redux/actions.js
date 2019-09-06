/* 
包含n个用于生成action对象的工厂函数(action creator)的模块
*/

import {
  INCREMENT,
  DECREMENT
} from './action-types'

/* 返回增加的action的action creator */
export const increment = number => ({type: INCREMENT, number})

/* 返回减少的action的action creator */
export const decrement = number => ({type: DECREMENT, number})