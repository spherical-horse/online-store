const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[fullhash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ESLintPlugin({ extensions: ['ts'] }),
    new CopyWebPackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/products', to: 'products' },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/i, use: 'ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'file-loader',
        //   },
        // ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',
}