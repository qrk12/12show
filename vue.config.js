'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let cdn = {}
if (process.env.NODE_ENV === 'production') {
  cdn = {
    css: [
      // element-ui css
      'https://cdn.staticfile.org/element-ui/2.13.0/theme-chalk/index.css'
    ],
    js: [
      // vue must at first!
      'https://cdn.staticfile.org/vue/2.6.11/vue.min.js',
      'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
      // element-ui js
      'https://cdn.staticfile.org/element-ui/2.13.0/index.js'
    ]
  }
} else {
  cdn = {
    css: [
      // element-ui css
      'https://cdn.staticfile.org/element-ui/2.13.0/theme-chalk/index.css'
    ],
    js: [
      // vue must at first!
      'https://cdn.staticfile.org/vue/2.6.11/vue.js',
      'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.js',
      // element-ui js
      'https://cdn.staticfile.org/element-ui/2.13.0/index.js'
    ]
  }
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: config => {
    // 不打包，使用cdn
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }

    if (process.env.NODE_ENV === 'production') {
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }

}
