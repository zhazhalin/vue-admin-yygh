'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8201"',
  // BASE_API: '"http://localhost:8202"',
  // BASE_API: '"http://localhost:9001"', //nginx
  BASE_API: '"http://localhost"', //gateway
})
