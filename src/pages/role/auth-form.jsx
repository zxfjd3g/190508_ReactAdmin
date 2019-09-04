import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
export default class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object
  }

  render() {
    console.log('AuthForm render()')
    const { role } = this.props
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} />
        </Item>
      </div>
    )
  }
}
