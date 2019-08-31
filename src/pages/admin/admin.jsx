import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

/* 
一级路由组件: 管理
*/
export default class Admin extends Component {
  render() {

    const user = memoryUtils.user
    // 如果没有登陆, user没有_id
    if (!user._id) {
      // 自动跳转到login
      // this.props.history.replace('/login') 只能在事件回调函数中执行
      // 在render()中返回<Redirect>
      return <Redirect to="/login"></Redirect>
    }

    return (
      <div>
        Hello, {user.username}
      </div>
    )
  }
}
