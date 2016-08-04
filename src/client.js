import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './components/App'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
)