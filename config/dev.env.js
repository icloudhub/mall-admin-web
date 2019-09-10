'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.2.43:15675"'
  // BASE_API: '"http://120.77.202.156:15675"'
})
