import React from 'react'
import { render } from 'react-dom'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'
import { autorun } from 'mobx'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const preloadedState = window.PRELOADED_STATE
const store = new MainStore(preloadedState)
const rootElement = document.getElementById('app')

render(
  <App store={store} />,
  rootElement
)

autorun(()=>{
  // console.log(JSON.parse(JSON.stringify(store.indexedTables)))
})