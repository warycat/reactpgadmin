import React, { Component, PropTypes } from 'react'
import * as A from '../actions'
import { connect } from 'react-redux'

class Counter extends Component {
  c1() {
    console.log('234234')
  }

  render() {
    const { counter, dispatch } = this.props
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={this.c1}>+</button>
        {' '}
        <button onClick={dispatch(A.decrement())}>-</button>
        {' '}
        <button onClick={dispatch(A.incrementIfOdd())}>Increment if odd</button>
        {' '}
        <button onClick={dispatch(A.incrementAsync())}>Increment async</button>
      </p>
    )
  }
}

Counter = connect(
  (state) => {
    return {counter: state.counter}
  },
  (dispatch) => {
    return {dispatch: dispatch}
  }
)(Counter)

export default Counter