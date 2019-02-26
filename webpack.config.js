let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');

module.exports =  {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
    descriptionFiles: ['package.json'],
    extensions : ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new LiveReloadPlugin()
  ]
};

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var CompressionWebpackPlugin = require('compression-webpack-plugin');

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new UglifyJsPlugin({
      sourceMap: true
    }),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|ts|vue|json|png|jpg|gif|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}