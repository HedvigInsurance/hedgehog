const webpack = require('webpack')
const threadLoader = require('thread-loader')
const path = require('path')
const babelrc = require('../.babelrc')

threadLoader.warmup({}, ['babel-loader'])

module.exports = ({
  mode,
  entry,
  target,
  plugins,
  output,
  context,
  ...rest
}) => ({
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.css'],
    modules: [
      path.resolve(context, 'node_modules'),
      path.resolve(/**/ context, 'src'),
      path.resolve(context, 'shared'),
    ],
  },
  entry,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(tsx?|js)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: { ...babelrc, cacheDirectory: true },
          },
        ],
      },
    ],
  },
  target,
  context,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
    children: false,
  },
  output,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^moment($|\/)/),
    ...(plugins || []),
  ],
  bail: true,
  ...rest,
})
