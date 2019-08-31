import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/logo.png'
import './login.less'

const {Item} = Form

/* 
一级路由组件: 登陆
*/
class Login extends Component {

  handleSubmit = event => {
    // 阻止事件默认行为(不提交表单)
    event.preventDefault();
    // 得到输入数据
    const form = this.props.form
    const username = form.getFieldValue('username')
    const password = form.getFieldValue('password')
    const values = form.getFieldsValue()
    console.log(username, password, values)

    alert('发送登陆的ajax登陆')
  };

  render() {
    const form = this.props.form
    const getFieldDecorator  = this.props.form.getFieldDecorator
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
              {
                getFieldDecorator('username', {})(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="用户名"
                  />
                )
              }

              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {})(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
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

const WrappedLogin = Form.create()(Login)
export default WrappedLogin

/* 
Form组件: 包含有<Form>的组件  ==> Login

function (props) {
  // 封装包含n个功能方法的对象: form
  // 将form传递给要包装的组件

  return (
    <Login {...props} form={form对象}></Login>
  )
}

高阶函数
  特点
      接收参数是函数
      返回值是函数
  常见:
      Promise()/then()
      数组很多方法: map()/reduce()/find()/filter()...
      setTimeout()/setInterval()
      addEventListner()
      bind()
      Form.create()()
  好处
      功能更加动态, 更加具有扩展
高阶组件
  参数为组件，返回值为新组件的函数
  React 中用于复用组件逻辑的一种高级技巧
    将多个组件通用的功能提取到高阶组件函数中, 再通过标签属性传递要包装的组件

*/
