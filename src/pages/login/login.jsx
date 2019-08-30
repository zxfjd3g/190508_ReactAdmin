import React, { Component } from 'react'
import logo from './images/logo.png'
import './login.less'

/* 
一级路由组件: 登陆
*/
export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <div>登陆form</div>
        </div>
      </div>
    )
  }
}
