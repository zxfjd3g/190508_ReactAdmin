import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuConfig from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import "./index.less"

/* 
Admin的右侧头部组件
*/
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天气的图片url
    weather: '', // 天气的文本值
  }

  /* 
  根据当前请求的路径查找对应的title
  */
  getTitle = () => {
    // 当前请求路由路径
    const path = this.props.location.pathname

    let title
    menuConfig.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key===path)
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  updateTime = () => {
    setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000)
  }

  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('上海')
    this.setState({
      dayPictureUrl, 
      weather
    })
  }

  componentDidMount () {
    this.updateTime()
    this.getWeather()
  }

  render() {
    const {currentTime, dayPictureUrl, weather} = this.state
    const {username} = memoryUtils.user

    const title = this.getTitle()

    return (
      <div className="header">
          <div className="header-top">
            欢迎, {username}   &nbsp;
            <a href="javascript:">退出</a>
          </div>
          <div className="header-bottom">
            <div className="header-bottom-left">{title}</div>
            <div className="header-bottom-right">
              <span>{currentTime}</span>
              {dayPictureUrl ? <img src={dayPictureUrl} alt="weather"/> : null}
              <span>{weather}</span>
            </div>
          </div>
      </div>
    )
  }
}

export default withRouter(Header)