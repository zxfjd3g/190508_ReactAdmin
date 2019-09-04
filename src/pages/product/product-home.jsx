import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import memoryUtils from '../../utils/memoryUtils';

const {Option} = Select

/* 
商品管理的默认子路由组件
*/
export default class ProductHome extends Component {

  state = {
    products: [], // 当前页的商品数组
    total: 0, // 总商品数量
    searchType: 'productName',
    searchName: ''
  }

  /* 
  根据指定页码异步请求获取对应页的数据显示
  */
  getProducts = async (pageNum) => {
    this.current = pageNum // 保存当前请求的页码
    let result
    const {searchType, searchName} = this.state
    if (this.search && searchName) { // 搜索分页请求
      result = await reqSearchProducts({pageNum, pageSize: 2, searchType, searchName})
    } else { // 发一般分页的请求
      result = await reqProducts(pageNum, 2)
    }
    
    if (result.status===0) {
      const {list, total} = result.data
      this.setState({
        products: list,
        total
      })
    }
  }

  reqUpdateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status===0) {
      message.success('更新商品状态成功')
      this.getProducts(this.current) // 重新获取当前页显示
    }
  }

  componentWillMount () {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        width: 100,
        render: ({_id, status}) => { // 1: 在售, 2: 已下架
          let btnText = '下架'
          let text = '在售'
          if (status===2) {
            btnText = '上架'
            text = '已下架'
          }

          return (
            <React.Fragment>
              <Button 
                type="primary" 
                onClick={()=> this.reqUpdateStatus(_id, status===1 ? 2 : 1)}>
                {btnText}
              </Button>
              <span>{text}</span>
            </React.Fragment>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <>
              <LinkButton 
                onClick={() => {
                  // 将product保存到共享内存
                  memoryUtils.product = product
                  // 跳转到detail组件显示product
                  this.props.history.push(`/product/detail/${product._id}`)
                }}
              >
                详情
              </LinkButton>
              <LinkButton>修改</LinkButton>
            </>
          )
        }
      },
    ]
  }

  componentDidMount () {
    this.getProducts(1)
  }

  render() {
    const {products, total, searchType, searchName} = this.state
    const title = (
      <>
        <Select 
          value={searchType} 
          style={{width: 150}} 
          onChange={value => this.setState({searchType: value})}
        >
          <Option key="1" value="productName">按名称搜索</Option>
          <Option key='2' value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          placeholder="关键字" 
          value={searchName} 
          style={{width: 200, margin: '0 15px'}}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type="primary" onClick={() => {
          // 保存一个搜索标记
          this.search = true
          this.getProducts(1)
        }}>搜索</Button>
      </>
    )

    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.current, // 当前选中哪个页码
            pageSize: 2, 
            total,
            // onChange: (page) => this.getProducts(page)
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
