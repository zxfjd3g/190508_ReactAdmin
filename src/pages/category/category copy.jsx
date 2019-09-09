import React, { Component, useState, useEffect, useRef } from 'react'
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

function Category(props) {
  const [categorys, setCategorys] = useState([]) 
  const [loading, setLoading] = useState([false]) 
  const [showStatus, setShowStatus] = useState([]) 
  const formRef = useRef(null)
  const categoryRef = useReRef({})
  const columnsRef = useReRef([
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 250,
      title: '操作',
      render: (category) => <LinkButton onClick={() => showUpdate(category)}>修改分类</LinkButton>
    },
  ])

  /* 
  获取获取所有分类列表显示
  */
  getCategorys = async () => {
    // 显示loading
    setLoading(true)
    const result = await reqCategorys()
    // 隐藏loading
    setLoading(false)
    if (result.status===0) {
      const categorys = result.data
      setCategorys(categorys)
    }
  }

  /* 
  添加分类
  */
  addCategory = () => {
    // 对form进行验证
    formRef.current.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框中的数据(变为initialValue)
        formRef.current.resetFields()
        // 验证通过后发请求添加分类
        const result = await reqAddCategory(values.categoryName)
        if (result.status===0) {
          setShowStatus(0)
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
  updateCategory = () => {
    // 对form进行验证
    formRef.current.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框中的数据(变为initialValue)
        formRef.current.resetFields()
        // 验证通过后发请求更新分类
        values.categoryId = categoryRef.current._id
        const result = await reqUpdateCategory(values)
        if (result.status===0) {
          setShowStatus(0)
          message.success('修改分类成功')
          // 获取最新分类列表显示
          getCategorys()
        } else {
          message.error(result.msg || '修改分类失败')
        }
      }
    })
  }

  /* 
  取消
  */
  function handleCancel () {
    // 重置输入框中的数据(变为initialValue)
    formRef.current.resetFields()
    setShowStatus(0)
  }

  /* 
  显示添加界面
  */
  function showAdd () {
    setShowStatus(1)
  }
  /* 
  显示修改界面
  */
  showUpdate = (category) => {
    // 保存当前分类
    categoryRef.current.category = category
    setShowStatus(2)
  }

  useEffect(() => getCategorys(), [])

  // 取出保存的用于更新的分类对象
  const category = categoryRef.current

  const extra = (
    <Button type="primary" onClick={showAdd}>
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
        columns={columnsRef.current} 
      />
      <Modal
        title="添加分类"
        visible={showStatus===1}
        onOk={addCategory}
        onCancel={handleCancel}
      >
        <CategoryForm setForm={(form) => formRef.current = form}/>
      </Modal>
      <Modal
        title="修改分类"
        visible={showStatus===2}
        onOk={updateCategory}
        onCancel={handleCancel}
      >
        <CategoryForm 
          categoryName={category.name} 
          setForm={(form) => formRef.current = form}
        />
      </Modal>
    </Card>
  )
}
