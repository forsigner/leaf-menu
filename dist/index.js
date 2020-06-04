
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./leaf-menu.cjs.production.min.js')
} else {
  module.exports = require('./leaf-menu.cjs.development.js')
}
