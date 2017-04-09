const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLwebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CWP = require('clean-webpack-plugin')
const compression = require('compression-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const entries = [
  './app/index.tsx',
]

const main = new ExtractTextPlugin('bundle.min.css')

module.exports = {
  browser: {
    entry: entries,
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: main.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?modules&sourceMap&constLoaders = require(alIdentName=[hash:base64:6]',
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
          }),
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
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve('./build/assets/'),
      filename: 'bundle.min.js',
      publicPath: '/assets/',
    },
    plugins: [
      main,
      new HTMLwebpackPlugin({
        filename: '../index.html',
        template: './app/views/index.ejs',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true,
        },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
          keep_fnames: false,
        },
      }),
      new compression({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css$/,
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
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
      new CWP(['build'], {
        root: path.resolve(__dirname, '../../'),
      }),
    ],
  },
  server: {
    entry: './server/index.ts',
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
      new CWP(['server.js'], {
        root: path.resolve(__dirname, '../../'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
    ],
  },
}
