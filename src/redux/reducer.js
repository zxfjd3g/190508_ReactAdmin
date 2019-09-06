/* 
包含n个reducer函数的模块
reducer函数: 根据老的state和指定的action, 生成并返回一个新的state
*/
import {combineReducers} from 'redux'

/* 
管理xxx状态数据的reduer函数
*/
const initXxx = 2
function xxx(state=initXxx, action) {
  switch (action.type) {
  
    default:
      return state
  }
}

/* 
管理yyy状态数据的reduer函数
*/
const initYyy = {}
function yyy(state=initYyy, action) {
  switch (action.type) {
  
    default:
      return state
  }
}
/* 
combineReducers(): 整合多个reducer返回一个总的reducer
  function (state, action) {}
总的state的结构:
  属性名: 返回这个数据的reducer的标识名称
  属性值: 对应的reducer执行返回的结果
  {
    xxx: 2,
    yyy: {}
  }
*/
export default combineReducers({
  xxx: xxx,
  yyy: yyy
})