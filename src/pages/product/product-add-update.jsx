
import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'

import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
const {Item} = Form
const {Option} = Select

/* 
商品管理的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  handleSubmit = (event) => {
    // 阻止事件的默认行为(不提交表单)
    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const {name, desc, price, categoryId} = values
        console.log(name, desc, price, categoryId)
      }
    })
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status===0) {
      const categorys = result.data
      this.setState({
        categorys
      })
    }
  }

  /* 
  对价格进行自定义验证
  */
  validatePrice = (rule, value, callback) => {
    if (value < 0) {
      callback('价格不能小于0')
    } else {
      callback()
    }
  }

  componentDidMount () {
    this.getCategorys()
  }

  render() {

    const {categorys} = this.state
    const product = this.props.location.state || {}

    const {getFieldDecorator} = this.props.form

    const title = (
      <>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>{product._id ? '修改' : '添加'}商品</span>
      </>
    )

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    return (
      <Card title={title}>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  {required: true, whitespace: true, message: '请输入商品名称'}
                ]
              })(
                <Input placeholder="商品名称" />
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  {required: true, whitespace: true, message: '请输入商品描述'}
                ]
              })(
                <Input placeholder="商品描述" />
              )
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: product.price && (''+product.price),
                rules: [
                  {required: true, whitespace: true, message: '请输入商品价格'},
                  {validator: this.validatePrice}
                ]
              })(
                <Input type="number" placeholder="商品价格" addonAfter="元"/>
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: product.categoryId || '',
                rules: [
                  {required: true, whitespace: true, message: '请选择商品分类'}
                ]
              })(
                <Select>
                  <Option value="">未选择</Option>
                  {
                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>

          <Item label="商品图片" wrapperCol={{span: 15 }}>
            <PicturesWall />
          </Item>

          <Item label="商品详情">
            商品详情组件
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
