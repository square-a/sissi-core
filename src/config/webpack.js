const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const config = require('@/config');

const isProduction = process.env.NODE_ENV === 'production';
const inPath = path.resolve(process.cwd(), config.inDir);
const outPath = path.resolve(process.cwd(), config.publicDir);
const templateName = `${config.tmpDir}/template.html`;
const scriptName = `${config.tmpDir}/sissi-script.js`;
const styleName = 'sissi-styles.css';

module.exports = {
  entry: inPath,
  output: {
    filename: scriptName,
    publicPath: '/',
    path: outPath,
    library: config.entryComponent,
    libraryTarget: 'umd',
  },
  devtool: isProduction ? false : 'source-maps',
  devServer: {
    contentBase: outPath,
    port: config.devPort,
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [inPath],
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: ['@babel/preset-react'],
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
      filename: isProduction ? templateName : 'index.html',
      template: path.resolve(outPath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: styleName,
      path: outPath,
    }),
  ],
};
