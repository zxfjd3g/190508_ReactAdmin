import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'

import { reqProduct, reqCategory } from '../../api'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import {BASE_IMG_PATH} from '../../utils/constants'

const {Item} = List
/* 
商品管理的详情子路由组件
*/
export default class ProductDetail extends Component {

  state = {
    product: memoryUtils.product,
    categoryName: ''
  }

  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    if (result.status===0) {
      const categoryName = result.data.name
      this.setState({
        categoryName
      })
    }
  }

  async componentDidMount () {
    // 如果状态中的product是一个空对象, 发请求获取
    if (!this.state.product._id) {
      const result = await reqProduct(this.props.match.params.id)
      if (result.status===0) { // 内存没有product
        const product = result.data
        this.setState({
          product
        })
        // 请求获取分类
        this.getCategory(product.categoryId)
      } 
    } else {// 内存有product, 直接发请求获取分类
      this.getCategory(this.state.product.categoryId)
    }
  }


  render() {
    const {product, categoryName} = this.state

    const title = (
      <>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </>
    )
    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片:</span>
            <span className="detail-imgs">
              {
                product.imgs && product.imgs.map(item => (
                  <img key={item} src={BASE_IMG_PATH + item} alt="img"/>
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{__html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
