
import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'

import LinkButton from '../../components/link-button'

const {Item} = Form
const {Option} = Select

/* 
商品管理的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {

  handleSubmit = () => {

  }

  render() {

    const {getFieldDecorator} = this.props.form

    const title = (
      <>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>添加商品</span>
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
                initialValue: '',
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
                initialValue: '',
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
                initialValue: '',
                rules: [
                  {required: true, whitespace: true, message: '请输入商品价格'}
                ]
              })(
                <Input type="number" placeholder="商品价格" addonAfter="元"/>
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  {required: true, whitespace: true, message: '请选择商品分类'}
                ]
              })(
                <Select>
                  <Option value="">未选择</Option>
                  <Option value="123">ff</Option>
                </Select>
              )
            }
          </Item>

          <Item label="商品图片">
            图片上传组件
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
