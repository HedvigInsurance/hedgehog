const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

module.exports =
  webpackConfig({
    entry: {
      app: [
        '@babel/polyfill',
        'webpack-dev-server/client',
        'webpack/hot/dev-server',
        path.resolve(root, 'src/clientEntry.tsx'),
      ],
    },
    target: 'web',
    mode: 'development',
    devServer: {
      compress: true,
      hot: true,
      inline: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 9443,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    output: {
      filename: '[name].js',
      publicPath: 'http://localhost:9443/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
    context: root,
  })