const webpack = require('webpack');
var config = module.exports = require('./webpack.config');

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.NoErrorsPlugin()
);
config.debug = false;
config.devtool = "cheap-source-map";
