/* 
入口JS
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/store'

import App from './containers/App'

ReactDOM.render((
  <Provider store={store}> {/* 内部向所有容器组件提供store */}
    <App/>
  </Provider>
), document.getElementById('root'))