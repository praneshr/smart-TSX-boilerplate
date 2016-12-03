const _ = require('lodash')
const config = require('config')

module.exports = [
  _.omit(config.webpack.browser, 'watch'),
  _.omit(config.webpack.server, 'watch'),
]
