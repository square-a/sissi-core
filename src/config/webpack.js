const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const isProduction = process.env.NODE_ENV === 'production';
const inPath = path.resolve(process.cwd(), 'src');
const outPath = path.resolve(process.cwd(), 'public');
const htmlName = '_tmp/template.html';
const scriptName = '_tmp/sissi-script.js';
const styleName = 'sissi-styles.css';

module.exports = {
  entry: inPath,
  output: {
    filename: scriptName,
    path: outPath,
    library: 'Page',
    libraryTarget: 'umd',
  },
  devtool: isProduction ? false : 'source-maps',
  devServer: {
    contentBase: outPath,
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [inPath],
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: htmlName,
      inject: 'head',
      template: path.resolve(outPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: styleName,
      path: outPath,
    }),
  ],
};
