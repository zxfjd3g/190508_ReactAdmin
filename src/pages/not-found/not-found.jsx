import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import {connect} from 'react-redux'

import {setHeaderTitle} from '../../redux/actions'
import './not-found.less'

/*
前台404页面
 */
class NotFound extends Component {

  constructor (props) {
    super(props)
    this.props.setHeaderTitle('404')
  }
  goHome = () => {
    this.props.setHeaderTitle('首页')
    this.props.history.replace('/home')
  }

  render() {
    return (

      <Row className='not-found'>
        <Col span={12} className='left'></Col>
        <Col span={12} className='right'>
          <h1>404</h1>
          <h2>抱歉，你访问的页面不存在</h2>
          <div>
            <Button type='primary' onClick={this.goHome}>
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(
  null,
  {setHeaderTitle}
)(NotFound)