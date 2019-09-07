import React, { Component } from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import { Layout } from 'antd'
import {connect} from 'react-redux'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'

const { Footer, Sider, Content } = Layout



/* 
一级路由组件: 管理
*/
class Admin extends Component {
  render() {

    const user = this.props.user
    // 如果没有登陆, user没有_id
    if (!user._id) {
      // 自动跳转到login
      // this.props.history.replace('/login') 只能在事件回调函数中执行
      // 在render()中返回<Redirect>
      return <Redirect to="/login"></Redirect>
    }

    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: 'white', margin: '20px 20px 0'}}>
            <Switch>
              <Redirect from="/" to="/home" exact/>
              <Route path="/home" component={Home} />
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  {}
)(Admin)