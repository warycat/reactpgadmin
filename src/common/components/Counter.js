import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Counter extends Component {
  render() {
    const { counter, increment, decrement, incrementIfOdd, incrementAsync} = this.props
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={incrementAsync}>Increment async</button>
      </p>
    )
  }
}

Counter = connect(
  (state) => {
    return {counter: state.counter}
  },
  (dispatch) => {
    return bindActionCreators(actions, dispatch)
  }
)(Counter)

export default Counter