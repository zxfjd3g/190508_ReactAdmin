import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import { reqLogin } from '../../api'
import logo from '../../assets/images/logo.png'
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
    // const username = form.getFieldValue('username')
    // const password = form.getFieldValue('password')
    // const values = form.getFieldsValue()
    // console.log(username, password, values)

    form.validateFields(async (error, {username, password}) => {
      if (!error) { // 验证通过
        // 发登陆的ajax
        const result = await reqLogin(username, password)
        // console.log('result', result)
        if (result.status===0) { // 请求登陆成功
          // 得到返回的用户信息对象
          const user = result.data  // [object Object]

          // 保存user (local/memory)
          // localStorage.setItem('user_key', JSON.stringify(user))
          storageUtils.saveUser(user)
          memoryUtils.user = user

          // 跳转到admin路由
          this.props.history.replace('/')

        } else { // 请求登陆失败
          message.error(result.msg)
        }
        
      } else {
        console.log('前台表单验证失败')
      }
    })
  }

  /* 
  验证密码的验证器函数
  */
  validatePwd = (rule, value, callback) => {
    value = value.trim()
    /* 
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
    */
    if (!value) {
      callback('请输入密码')
    } else if (value.length<4) {
      callback('密码不能小于4位')
    }  else if (value.length>12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码只能包含英文、数字或下划线!')
    } else {
      callback() // 验证通过
    }
  }

  render() {

    const user = memoryUtils.user
    // 如果登陆
    if (user._id) {
      // 自动跳转到admin
      return <Redirect to="/"></Redirect>
    }

    const form = this.props.form
    const getFieldDecorator  = form.getFieldDecorator
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
                /* 
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
                */
                getFieldDecorator('username', {
                  initialValue: '', // 指定输入框的初始值
                  // 声明式验证: 使用内置的验证规则进行验证
                  rules: [
                    { required: true, whitespace: true, message: '必须输入用户名!' },
                    { min: 4, message: '用户名不能小于4位!' },
                    { max: 12, message: '用户名不能大于12位!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含英文、数字或下划线!' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="用户名"
                  />
                )
              }

              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', // 指定输入框的初始值
                  rules: [
                    {validator: this.validatePwd}
                  ]
                })(
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

/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */

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
