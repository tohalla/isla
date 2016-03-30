const production = require('./webpack.production.config');
const development = require('./webpack.development.config');

module.exports = process.env.NODE_ENV === 'production' ?
  production :
  development;
