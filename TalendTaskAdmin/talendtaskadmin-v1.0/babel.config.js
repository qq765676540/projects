const webpack = require('webpack');

module.exports = {
  outputDir: 'D:/VUEProject/TalenTaskAdmin',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }
}
