const path = require("path");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 设置进度字体颜色
const chalk = require('chalk');
// 以树图的方式展示打包后的文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
 mode:'production',
 entry:{

 },
 output:{
  path:path.resolve(__dirname, '../dist'),
  filename:'[name].[hash].min.js'
 },
 module:{
  rules: [{
    test: /\.jsx?$/,
    use: [{
      loader: 'babel-loader'
    }]
  },
  {
    test: /\.css$/,
    use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader'
      }
    ]
  }
]
 },
 plugins: [
  new HtmlWebpackPlugin({
    title: 'Webpack Book Demo',
    filename: 'index.html', //指定生成的HTML文件名
    template: path.join(__dirname, '../public/index.html') // 指定模板路径
  }),
  new CleanWebpackPlugin(),
  new ProgressBarPlugin({
    format: chalk.green('Progressing') + '[:bar]' + chalk.green(':percent') + '(:elapsed seconds)',
    clear: false
  }),
  new BundleAnalyzerPlugin()
]
}