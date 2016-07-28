import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component{
  render(){
    console.log(this.props);
    return <h1>111{this.props.counter}222</h1>
  }
}

App = connect(
  (state) => {
    return {counter: state.counter}
  },
  (dispatch) => {
    return {dispatch: dispatch}
  }
)(App)

export default App