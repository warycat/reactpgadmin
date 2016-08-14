import qs from 'qs'
import express from 'express'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'

const app = express()
const port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}))

app.use(handleRender)

function handleRender(req, res) {
  const params = qs.parse(req.query)
  const store = MainStore.fromJS({title: 'reactpgadmin'})

  const app = renderToString(
    <App store={store} />
  )
  const finalState = store.toJS()
  res.send(renderFullPage(app, finalState))
}

function renderFullPage(app, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Mobx Server Rendering</title>
      </head>
      <body>
        <div id="app">${app}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
