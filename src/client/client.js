import React from 'react'
import { render } from 'react-dom'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'
import injectTapEventPlugin from 'react-tap-event-plugin'

const preloadedState = window.PRELOADED_STATE
const store = MainStore.fromJS(preloadedState)
const rootElement = document.getElementById('app')
injectTapEventPlugin()

render(
  <App store={store} />,
  rootElement
)
