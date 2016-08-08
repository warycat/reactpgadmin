import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Counter from './Counter'
import * as CounterActions from '../actions'

const App = connect(
  (state) => {
    return {counter: state.counter}
  },
  (dispatch) => {
    return bindActionCreators(CounterActions, dispatch)
  }
)(Counter)

console.log(App)
export default App