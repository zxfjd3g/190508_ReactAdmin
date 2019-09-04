import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'

const {Item} = List
/* 
商品管理的详情子路由组件
*/
export default class ProductDetail extends Component {



  render() {
    const product = memoryUtils.product

    const title = (
      <>
        <LinkButton>
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
            <span>thinkpad xxx</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述:</span>
            <span>aaaaa</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格:</span>
            <span>2000元</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类:</span>
            <span>tttt</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片:</span>
            <span className="detail-imgs">
              <img src="http://localhost:5000/upload/image-1567144819062.jpg" alt="img"/>
              <img src="http://localhost:5000/upload/image-1567144819062.jpg" alt="img"/>
              <img src="http://localhost:5000/upload/image-1567144819062.jpg" alt="img"/>
            </span>
          </Item>
          <Item>
            <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{__html: '<p><del>sfddsfds</del></p>'}}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
