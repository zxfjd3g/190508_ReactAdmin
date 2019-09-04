
import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd'

import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

import LinkButton from '../../components/link-button'
import {reqCategorys, addOrUpdateProduct} from '../../api'
const {Item} = Form
const {Option} = Select

/* 
商品管理的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  // 创建一个ref容器对象, 并保存在组件对象上
  pwRef = React.createRef()
  editorRef = React.createRef()

  handleSubmit = (event) => {
    // 阻止事件的默认行为(不提交表单)
    event.preventDefault()

    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        // 得到表单自动收集的数据
        const {name, desc, price, categoryId} = values
        console.log(name, desc, price, categoryId)
        // 获取所有上传图片文件名的数组
        const imgs = this.pwRef.current.getImgs()
        console.log('imgs', imgs)

        // 获取商品详情
        const detail = this.editorRef.current.getDetail()
        console.log('detail', detail)

        // 封装product
        const product = {name, desc, price, categoryId, imgs, detail}
        if (this.props.location.state) {
          product._id = this.props.location.state._id
        }

        // 请求添加/更新商品
        const result = await addOrUpdateProduct(product)
        if (result.status===0) {
          message.success('操作商品成功')
          this.props.history.replace('/product')
        } else {
          message.error('操作商品失败')
        }
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
            <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
          </Item>

          <Item label="商品详情" wrapperCol={{span: 20 }}>
            <RichTextEditor ref={this.editorRef} detail={product.detail}/>
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
