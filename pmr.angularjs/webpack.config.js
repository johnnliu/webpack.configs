var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');
 
module.exports = {
  cache: true,
  context: path.join(__dirname, '/angularjs/app/pm'), 
  entry: {
    'app': ['./app.module'],
    'app-pmr': ['pmr/app.module'],
    'app-comment': ['comment/app.module'],
    'app-picture': ['picture/app.module'],
    vendor: [ /*'moment', 'jquery', 'angular', */ 'blocks.exception', 'blocks.logger', 'blocks.filter', 'blocks/polyfill/es5', 'blocks.router']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/Style Library/hyway/',   // "/Style Library/hyway/angularjs/app/pm
    filename: '[name].js'
  },
  resolve: {
    alias:{ 
      "pmr": path.join(__dirname, '/angularjs/app/pmr'),
      "pm": path.join(__dirname, '/angularjs/app/pm'),
      "comment": path.join(__dirname, '/angularjs/app/comment'),
      "picture": path.join(__dirname, '/angularjs/app/picture'),

      "app.common": 'pmr/core/core.common.module',
      "dataservice": 'pmr/core/dataservice',
      "chartservice": 'pmr/core/chartservice', 
      "sp": 'pmr/core/sp', 
      "form.core": 'pmr/core/form.core',
      "form.directive": 'pmr/core/form.directive',
      "form.status": 'pmr/core/form.status',

      "blocks": path.join(__dirname, '../hyway/angularjs/blocks'),
      "blocks.exception": 'blocks/exception/exception',
      "blocks.logger": 'blocks/logger/logger',
      "blocks.filter": 'blocks/filter/filter',
      "blocks.router": 'blocks/router/routehelper',

      "widgets": path.join(__dirname, '../hyway/angularjs/widgets'),

      "bower": path.join(__dirname, '../hyway/angularjs/bower_components')

    },
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  externals: {
    'jquery': 'jQuery',
    'angular': 'angular',
    'moment': 'moment',
    '_spPageContextInfo': '_spPageContextInfo',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    /*
    new HtmlWebpackPlugin({
      filename: 'SPApp.html',
      template: './src/sp-app.ejs',
      inject: false
    }),
    */
    //new es3ifyPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
      mangle: {
          // mangle options, if any
      },
      mangleProperties: {
        screw_ie8: false,
        //ignore_quoted: true,      // do not mangle quoted properties and object keys
      },
      compress: {
        screw_ie8: false, 
        //properties: false        // optional: don't convert foo["bar"] to foo.bar
      },
      output: {
        screw_ie8: false         
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.(jpg|gif|png)/, loader: 'url-loader?limit=100000' },
      { test: /\.(svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?/i, loader: 'url-loader' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.xhtml$/, loader: "ngtemplate?relativeTo=" + (path.resolve(path.join(__dirname, '/angularjs/app'))) + "/!html" }
    ]
  },
  devtool: 'source-map'
};

