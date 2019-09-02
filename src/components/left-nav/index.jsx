import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import "./index.less"

/* 
Admin的左侧导航组件
*/
export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
          <Link to="/home" className="left-nav-header">
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
          </Link>
      </div>
    )
  }
}
