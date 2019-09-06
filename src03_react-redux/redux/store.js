/* 
redux最核心的管理对象: store
*/
import { createStore } from 'redux'
import reducer from './reducer'

// 向外默认暴露store对象
export default createStore(reducer)

/* 
createStore(reducer)
1. 创建一个store对象
2. store内部保存reducer函数
3. store内部保存了一个状态数据: 调用reducer函数, 将返回值作为状态数据的初始值
*/