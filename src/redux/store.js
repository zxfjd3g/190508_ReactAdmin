/* 
redux最核心的管理对象: store
*/
import { createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 向外默认暴露store对象
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) // 应用上redux的异步中间件

/* 
createStore(reducer)
1. 创建一个store对象
2. store内部保存reducer函数
3. store内部保存了一个状态数据: 调用reducer函数, 将返回值作为状态数据的初始值
*/