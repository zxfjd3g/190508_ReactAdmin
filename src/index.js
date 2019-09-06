/* 
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'

import App from './App'

ReactDOM.render(<App store={store}/>, document.getElementById('root'))

// 在store内部的状态数据发生改变时, 重新渲染<App>
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})