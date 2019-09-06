/* 
容器组件: 应用根组件
*/
import { connect } from "react-redux"

import { increment, decrement } from '../redux/actions'
import Counter from '../components/counter'

/* 
将state数据映射成UI组件的一般属性的函数
函数接收redux的store管理的state值
函数的返回值是对象,对象中的所有属性都传入UI组件
*/
/* 
const mapStateToprops = (state) => ({
  count: state
})
 */
/* 
将包含dispatch函数调用语句的函数映射成UI组件的函数属性的函数
函数接收redux的store管理的dispatch属性值(函数)
函数的返回值是对象,对象中的所有方法都传入UI组件
*/
/* 
const mapDispatchToProps = (dispatch) => ({
  increment: number => dispatch(increment(number)),
  decrement: number => dispatch(decrement(number))
})
 */
/* 
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Counter)
 */
// 生成并返回容器组件
export default connect(
  state => ({count: state}),
  {increment, decrement} /* 不会原样传入, 而传入包装后的函数(包含dispatch()) */
)(Counter)

/* 
传入Counter组件的函数属性
  increment: number => dispatch(increment(number)),
  decrement: number => dispatch(decrement(number))
*/