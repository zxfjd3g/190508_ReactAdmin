import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

/*
添加分类的form组件
 */
export default class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object
  }

  /* 
  根据菜单数据数组生成<TreeNode>的数组
  */
  getTreeNodes = (menuList) => {
    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
    })
  }

  render() {
    console.log('AuthForm render()')
    const { role } = this.props
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll
        >
          <TreeNode title="平台权限" key="all">
            {
              this.getTreeNodes(menuList)
            }
          </TreeNode>
        </Tree>
      </>
    )
  }
}
