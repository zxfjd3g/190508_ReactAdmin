import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import {
  Card,
  Button,
  Icon,
  Table
} from 'antd'

const dataSource = [
  {
    "_id": "5c2ed631f352726338607046",
    "name": "分类001"
  },
  {
    "_id": "5c2ed647f352726338607047",
    "name": "分类2"
  },
  {
    "_id": "5c2ed64cf352726338607048",
    "name": "1分类3"
  }
]

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    width: 250,
    title: '操作',
    render: () => <LinkButton>修改分类</LinkButton>
  },
];

/**
 * 分类管理
 */
export default class Category extends Component {
  render() {
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"  /* 将数据对象category的_id的属性值作为每行的key */
          pagination={{pageSize: 2, showQuickJumper: true}}
          dataSource={dataSource} 
          columns={columns} 
        />
      </Card>
    )
  }
}
