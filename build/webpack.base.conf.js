var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var isDev = process.env.NODE_ENV === 'development'

const babelLoaderConfig = {
  //stage-0,stage-1,stage-2，stage-3  babel对es7的支持方式
  presets: ['env', 'stage-0', 'react'],
  // antd 表单组件需要装饰器 transform-decorators-legacy
  // antd 如果使用less样式文件（自定义主题必须使用） style: true，使用css文件 style: css
  plugins: [['import', {libraryName: 'antd',libraryDirectory: "lib", style: true}], "transform-decorators-legacy"],
  // 缓存提高打包效率
	cacheDirectory: false,
};

module.exports = {
  entry:{main:['babel-polyfill','./src/Index.jsx']},
  // {
  //   app: './src/main.js'
  // },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isDev
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    // 配置的后缀文件在import require的时候不需要带后缀
    extensions: ['.js','.jsx','.json','.scss','.less'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // {
      //   test: /\.pug$/,
      //   loader: 'pug-loader',
      //   options: {
      //     root: resolve('src/views'),
      //     pretty: true
      //   }
      // },
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      },
      // {
      //   test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [
    // ...utils.pageFile(isDev),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      React:"react"
    })
  ]
}
