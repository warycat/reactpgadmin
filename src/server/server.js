import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import React from 'react'
import { renderToString } from 'react-dom/server'
import pgp from 'pg-promise'

import webpackConfig from '../../webpack.config'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const server = express()
const port = process.env.PORT || 3000

const compiler = webpack(webpackConfig)
const db = pgp()(process.env.PG_URL)

server.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}))
server.use(require("webpack-hot-middleware")(compiler));

function renderFullPage(app, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Mobx Server Rendering</title>
        <link rel="shortcut icon" type="image/png" href="http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d"/>
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
  const store = new MainStore({
    title: 'reactpgadmin',
    userAgent: req.headers['user-agent'],
    version: packageJson.version,
    params: req.query,
  })
  const app = renderToString(
    <App store={store} />
  )
  const finalState = store.serialize()
  res.send(renderFullPage(app, finalState))
}

server.get('/', handleRender)

server.get('/db/query', (req, res) => {
  const qs = req.query
  console.log(qs)
  db.query(qs.text, qs.values)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

server.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
