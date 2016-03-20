var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var config = require(path.join('..', '..', '..', 'webpack.config'));

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      secure: false,
      ws: true,
      target: 'http://127.0.0.1:8080'
    }
  }
})
  .listen(3000, 'localhost', err => {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
  }
);
