import React, { Component } from 'react'
import {Modal, message} from 'antd'

import CategoryForm from './category-form'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button'
import {
  Card,
  Button,
  Icon,
  Table
} from 'antd'

/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categorys: [], // 所有分类的数组
    loading: false, // 标识是否正在请求中
    showStatus: 0, // 0: 都不显示, 1: 显示添加 2: 显示修改
  }

  /* 
  获取获取所有分类列表显示
  */
  getCategorys = async () => {
    // 显示loading
    this.setState({
      loading: true
    })
    const result = await reqCategorys()
    // 隐藏loading
    this.setState({
      loading: false
    })
    if (result.status===0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    }
  }

  /* 
  添加分类
  */
  addCategory = () => {
    // 对form进行验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框中的数据(变为initialValue)
        this.form.resetFields()
        // 验证通过后发请求添加分类
        const result = await reqAddCategory(values.categoryName)
        if (result.status===0) {
          this.setState({
            showStatus: 0
          })
          message.success('添加分类成功')
          // 获取最新分类列表显示
          this.getCategorys()
        } else {
          message.error(result.msg || '添加分类失败')
        }
      }
    })
    
  }

  /* 
  修改分类
  */
  UpdateCategory = () => {
    // 对form进行验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框中的数据(变为initialValue)
        this.form.resetFields()
        // 验证通过后发请求更新分类
        values.categoryId = this.category._id
        const result = await reqUpdateCategory(values)
        if (result.status===0) {
          this.setState({
            showStatus: 0
          })
          message.success('修改分类成功')
          // 获取最新分类列表显示
          this.getCategorys()
        } else {
          message.error(result.msg || '修改分类失败')
        }
      }
    })
  }

  /* 
  取消
  */
  handleCancel = () => {
    // 重置输入框中的数据(变为initialValue)
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  /* 
  显示添加界面
  */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /* 
  显示修改界面
  */
  showUpdate = (category) => {
    // 保存当前分类
    this.category = category

    this.setState({
      showStatus: 2
    })
  }

  componentDidMount () {
    this.getCategorys()
  }

  componentWillMount () {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        width: 250,
        title: '操作',
        render: (category) => <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
      },
    ]
  }

  render() {
    // 取出保存的用于更新的分类对象
    const category = this.category || {}

    const {categorys, loading, showStatus} = this.state
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table
          loading={loading}
          bordered={true}
          rowKey="_id"  /* 将数据对象category的_id的属性值作为每行的key */
          pagination={{pageSize: 2, showQuickJumper: true}}
          dataSource={categorys} 
          columns={this.columns} 
        />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.UpdateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm 
            categoryName={category.name} 
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}
