import querystring from 'querystring'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import React from 'react'
import { renderToString } from 'react-dom/server'

import webpackConfig from '../../webpack.config'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'

const server = express()
const port = process.env.PORT || 3000

const compiler = webpack(webpackConfig)

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
  version: packageJson.version,
}))

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
          window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

function handleRender(req, res) {
  const params = querystring.parse(req.query)
  const store = MainStore.fromJS({
    title: 'reactpgadmin',
    userAgent: req.headers['user-agent'],
    babelEnv: process.env.BABEL_ENV,
    params,
  })
  const app = renderToString(
    <App store={store} />
  )
  const finalState = store.toJS()
  res.send(renderFullPage(app, finalState))
}

server.use(handleRender)

server.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
