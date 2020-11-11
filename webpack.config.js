/* eslint-disable new-cap */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/javascript/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment ? 'bundle.js' : 'bundle.[hash].js'
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: isDevelopment
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? 'bundle.css' : 'bundle.[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: 'src/images',
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    }),
    new ESLintPlugin()
  ]
};
