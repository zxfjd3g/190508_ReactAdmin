import React, { PureComponent } from 'react'
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

export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor (props) {
    super(props)
    console.log('AuthForm constructor()')
   
    let checkedKeys = []
    const role = this.props.role
    if (role) {
      checkedKeys = role.menus
    }
    this.state = {
      checkedKeys
    }
  }

  getMenus = () => this.state.checkedKeys
  /* 
  根据菜单数据数组生成<TreeNode>的数组
  */
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.isPublic) {
        pre.push(
          <TreeNode title={item.title} key={item.key}>
            {item.children ? this.getTreeNodes(item.children) : null}
          </TreeNode>
        )
      }
      return pre
    }, [])
  }

  handleCheck = (checkedKeys) => {
    // 更新checkedKeys状态数据
    this.setState({
      checkedKeys
    })
  }

  /* 
  将要接收到新的属性的回调
  */
  componentWillReceiveProps (nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    console.log('AuthForm render()')

    const {checkedKeys} = this.state
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
          checkedKeys={checkedKeys}
          onCheck={this.handleCheck}
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
