var path                  = require('path'),
    _                     = require('lodash'),
    webpack               = require('webpack'),
    ExtractTextPlugin     = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin     = require('html-webpack-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    ALL_CONFIG            = require('./config.json');

var BUILD_DIR = './build';

module.exports = function(ENV, opts) {
  const CONFIG = ALL_CONFIG[ENV] || ALL_CONFIG['development'];

  opts = _.extend({
    jsBundleName: 'bundle.[hash:5].js',
    cssBundleName: 'bundle.[hash:5].css',
    plugins: []
  }, opts || {});

  return {
    BUILD_DIR: BUILD_DIR,
    entry: './src/app/app.jsx',
    output: {
      path: path.join(__dirname, 'build'),
      filename: path.join('/js', opts.jsBundleName)
    },
    context: path.join(__dirname),
    devtool: '#source-map',
    module: {
      loaders: [
        // Bootstrap loading
        {
          test: /bootstrap\/js\//,
          loader: 'imports?jQuery=jquery'
        },
        {
          test: /.woff2?(\?v=\d+.\d+.\d+)?$/,
          loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            'style-loader',
            'css?sourceMap!autoprefixer-loader!sass?sourceMap'
          )
        },
        {
          include: /\.json$/,
          loaders: ['json-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          query: {
            name: '/images/[name]-[hash:5].[ext]'
          }
        }
      ]
    },
    resolve: {
      root: [path.resolve('./src/app'), path.resolve('./src/app/assets')],
      extensions: ['', '.json', '.jsx', '.js', '.html']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV) || JSON.stringify(process.env.ENV)
        },
        'URLS': {

        }
      }),
      new webpack.ProvidePlugin({
        '$':         'jquery',
        '_':         'lodash',
        'React':     'react',
        'Redux':     'redux',
        'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new ExtractTextPlugin(path.join('/css', opts.cssBundleName)),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        favicon: './public/logo_favicon.png',
        inject: true
      }),
      new WebpackNotifierPlugin()
    ].concat(opts.plugins)
  };
};
