/* 
应用根组件
*/
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 0
  }

  increment = () => {
    const number = this.refs.numberSelect.value * 1
    this.setState({
      count: this.state.count + number
    })
  }

  decrement = () => {
    const number = this.refs.numberSelect.value * 1
    this.setState({
      count: this.state.count - number
    })
  }
  incrementIfOdd = () => {
    const number = this.refs.numberSelect.value * 1

    if (this.state.count %2 === 1) {
      this.setState({
        count: this.state.count + number
      })
    }
  }

  incrementAsync = () => {
    const number = this.refs.numberSelect.value * 1
    
    setTimeout(() => {
      this.setState({
        count: this.state.count + number
      })
    }, 1000)
  }

  render() {
    const count = this.state.count

    return (
      <div>
        <p>click {count} times</p>

        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div> 
    )
  }
}
