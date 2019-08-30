import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/logo.png'
import './login.less'

const {Item} = Form

/* 
一级路由组件: 登陆
*/
export default class Login extends Component {

  handleSubmit = event => {
    // 阻止事件默认行为(不提交表单)
    event.preventDefault();
    alert('发送登陆的ajax登陆')
  };

  render() {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="用户名"
              />
            </Item>
            <Form.Item>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
