const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const webpack = require("webpack");
const path = require('path')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  outputDir: 'C:/Users/EBI/Documents/Qlik/Sense/Extensions/GNCW/GNCW',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: { // webpack 配置
    output: {
      filename: `js/[name].[hash].js`,
      chunkFilename: `js/[name].[hash].js`
    },
    plugins: [
      new ExtractCssChunks(
        {
          filename: "css/[name].css",
          chunkFilename: "css/[name].css",
        }
      ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  css: {
    loaderOptions: {
      css: {
        localIdentName: 'css/[name].css',
        camelCase: 'only'
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 40,
            propList: ['*'],
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.performance.set('maxEntrypointSize', 400 * 1024 * 10)
    config.performance.set('maxAssetSize', 550 * 1024 * 10)

    config.resolve.alias.set('@img', path.resolve(__dirname, 'src/assets/image/'))

    config.optimization.splitChunks({
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[///]node_modules[///]/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        common: {
          chunks: 'all',
          test: /[///]src[///]common[///]/,
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        }
      }
    })

    return config
  }
}