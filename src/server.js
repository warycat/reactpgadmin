import qs from 'qs'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import App from './components/App'
import configureStore from './configureStore'
import packageJson from '../package.json'

const app = express()
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}))

app.use((req, res) => {
  const params = qs.parse(req.query)
  let preloadedState = {version: packageJson.version}
  const store = configureStore(preloadedState)
  const finalState = store.getState()
  console.log(finalState);
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  res.send(renderFullPage(html, finalState));
})

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

const server = app.listen(port, () => {
  console.log('Service started on port :' + port);
  console.log(process.env.PG_URL);
})