import React from 'react'
import './index.less'
/* 
包装button实现的看似链接的通用组件
children属性: 代表组件标签体内容
  1. 标签体文本  ==> children就是文本
  2. 标签体是标签 ==> children就是标签对象
  3. 标签体包含多个标签  ==>children就是包含多个标签对象的数组
*/
export default function LinkButton(props) {
  return <button className="link-button" {...props} />
}
