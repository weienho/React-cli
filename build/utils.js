var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var lessToJs = require('less-vars-to-js')
var fs=require('fs')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap  //在压缩后，js文件的行号，列号和函数名已经失真，使用sourcemap（需要在浏览器配置配合使用）可以还原出错的位置，方便debug，
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    })
  }

  // antd.style 自定义样式需要加载一个less文件，官方推荐的方式之一
  const customAntdTheme = lessToJs(fs.readFileSync('./src/styles/custom-antd/theme.less', 'utf8'));

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders('postcss'),
    less: generateLoaders('less'),//{modifyVars:customAntdTheme } // antd.style 使用modifyVars 的方式来覆盖变量 https://ant.design/docs/react/customize-theme-cn
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]

    const outputItem= {
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    };

    // if(extension==='less'||extension==='css') {
    //   outputItem.include=[resolve("/node_modules/antd"),resolve('src')];
    // }

    output.push(outputItem);
  }
  return output
}

// exports.pageFile = function (dev = true) {
//   var HtmlWebpackPlugin = require('html-webpack-plugin')
//   const fs = require('fs')
//   const path = require('path')
//   const testFolder = path.resolve(__dirname, '../src/')
  
//   var list = []
  
//   fs.readdirSync(testFolder).forEach(fileItem => {
//     var file = path.resolve(__dirname, `${testFolder}/${fileItem}`)
//     var distfile = fileItem.replace('.pug', '.html')

//     // https://github.com/ampedandwired/html-webpack-plugin
//     var options = {
//       filename: path.resolve(__dirname, `../dist/${distfile}`),
//       template: file,
//       inject: true
//     }

//     if (!dev) {
//       // generate dist index.html with correct asset hash for caching.
//       // you can customize output by editing /index.html
//       // see https://github.com/ampedandwired/html-webpack-plugin
//       options.minify = {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeAttributeQuotes: true
//       }
//       // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//       options.chunksSortMode = 'dependency'
//     }

//     list.push(new HtmlWebpackPlugin(options))
//   })

//   return list
// }
