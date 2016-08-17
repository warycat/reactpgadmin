import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import React from 'react'
import { renderToString } from 'react-dom/server'

import webpackConfig from '../../webpack.config'
import App from '../common/components/App'
import MainStore from '../common/stores/MainStore'
import packageJson from '../../package.json'
import massive from 'massive'
const server = express()
const port = process.env.PORT || 3000

const compiler = webpack(webpackConfig)
var db = massive.connectSync({connectionString : process.env.PG_URL})
console.log(db)
var tables = db.tables.map(view => { return {schema: view.schema, name: view.name} })

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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
  const store = MainStore.fromJS({
    title: 'reactpgadmin',
    userAgent: req.headers['user-agent'],
    nodeEnv: process.env.NODE_ENV,
    version: packageJson.version,
    params: req.query,
    tables: tables
  })
  const app = renderToString(
    <App store={store} />
  )
  const finalState = store.toJS()
  res.send(renderFullPage(app, finalState))
}

server.get('/', handleRender)

server.get('/db', (req, res) => {
  console.log(req.query)
  const qs = req.query
  db[qs.schema][qs.name].find((err, data)=>{
    res.json(data)
  })
})

server.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
