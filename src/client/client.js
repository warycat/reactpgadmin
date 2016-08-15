import React from 'react'
import { render } from 'react-dom'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'

const preloadedState = window.__PRELOADED_STATE__ || {title: 'reactpgadmin'}
const store = MainStore.fromJS(preloadedState)
const rootElement = document.getElementById('app')

render(
  <App store={store} />,
  rootElement
)