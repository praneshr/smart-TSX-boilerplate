import HTMLwebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'
import webpack from 'webpack'

const config = require('../server/default').default


const entries = [
  'babel-polyfill',
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?http://localhost:${config.port}`,
  './app/index.tsx',
]

export default {
  browser: {
    entry: entries,
    resolve: {
      alias: {
        'bootstrap-global': path.resolve(__dirname, '../../app/globals/styles/bootstrap/index.scss'),
      },
      extensions: ['.webpack.js', '.web.js', '.js', '.tsx', '.scss', '.html', '.ejs', '.ts'],
    },
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.global\.scss$/,
          loaders: [
            'style-loader',
            'css-loader?sourceMap',
            'sass-loader?sourceMap',
            'sass-resources-loader',
            'postcss-loader',
          ],
        },
        {
          test: /^((?!\.global).)*\.scss/,
          loaders: [
            'style-loader',
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[hash:base64:15]',
            'sass-loader',
            'sass-resources-loader',
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
      new webpack.NoErrorsPlugin(),
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
          sassResources: [
            './app/globals/styles/_colors.scss',
            './app/globals/styles/_variables.scss',
          ],
          context: path.resolve(__dirname, '../../'),
        },
      }),
    ],
  },
  server: {
    entry: './server/',
    resolve: {
      extensions: ['.js'],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: './',
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
