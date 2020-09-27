const path = require('path');
const webpack = require('webpack');
function resolveSrc(_path) {
  return path.join(__dirname, _path)
}
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'src': resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Paper Dashboard PRO',
    themeColor: '#66615B',
    msTileColor: '#66615B',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#66615B'
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  // devServer: {
  //   proxy: {
  //     '/backend' : {
  //       target: 'http://ec2-13-229-79-9.ap-southeast-1.compute.amazonaws.com:8090/',
  //       changeOrigin: true,
  //       logLevel: "debug",
  //       ws: true
  //     }
  //   }
  // }
};
