const HTMLwebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')

const config = require('../server/default')


const entries = [
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?http://localhost:${config.port}`,
  './app/index.tsx',
]

module.exports = {
  browser: {
    entry: entries,
    resolve: {
      alias: {
        'global-styles': path.resolve(__dirname, '../../app/globals/styles/index.scss'),
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.tsx', '.scss', '.html', '.ejs', '.ts'],
    },
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[hash:base64:15]',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './app/globals/styles/_colors.scss',
                  './app/globals/styles/_variables.scss',
                ],
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/,
          loader: 'file-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader',
        },
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loaders: ['react-hot-loader/webpack', 'ts-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve('./build/assets/'),
      filename: 'bundle.js',
      publicPath: '/assets/',
    },
    plugins: [
      new HTMLwebpackPlugin({
        filename: '../index.html',
        template: './app/views/index.ejs',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          resolve: {},
          postcss: [
            autoprefixer(),
          ],
          context: path.resolve(__dirname, '../../'),
        },
      }),
    ],
  },
  server: {
    entry: './server/index.ts',
    resolve: {
      extensions: ['.ts'],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve('./'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
    ],
  },
}
