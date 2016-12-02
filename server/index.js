import 'babel-register'

import _ from 'lodash'
import config from 'config'
import express from 'express'
import path from 'path'
import wds from 'webpack-dev-middleware'
import webpack from 'webpack'
import whm from 'webpack-hot-middleware'

const webpackConfig = _.omit(config.webpack.browser, 'watch')
const serverConfig = config.server
const app = express()
app.use(express.static(path.join(__dirname, 'build')))
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig)

  app.use(wds(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(whm(compiler))
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(serverConfig.port, () => {
  console.log(`Listening at http://localhost:${serverConfig.port}/`)
})
