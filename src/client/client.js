import React from 'react'
import { render } from 'react-dom'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'

const preloadedState = window.PRELOADED_STATE || {
  title: 'reactpgadmin',
  babelEnv: 'development',
  version: packageJson.version,
}
const store = MainStore.fromJS(preloadedState)
const rootElement = document.getElementById('app')

render(
  <App store={store} />,
  rootElement
)
