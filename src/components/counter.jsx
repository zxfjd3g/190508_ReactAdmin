/* 
应用根组件
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as actions from "../redux/actions";

/* 
UI组件
*/
export default class Counter extends Component {
  
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  }

  increment = () => {
    const number = this.refs.numberSelect.value * 1
    this.props.increment(number)
  }

  decrement = () => {
    const number = this.refs.numberSelect.value * 1
    this.props.decrement(number)
  }
  incrementIfOdd = () => {
    const number = this.refs.numberSelect.value * 1
    if (this.props.count %2 === 1) {
      this.props.increment(number)
    }
  }

  incrementAsync = () => {
    const number = this.refs.numberSelect.value * 1
    
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  }

  render() {
    const count = this.props.count

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
