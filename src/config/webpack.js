const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const config = require('@/config');

const isProduction = process.env.NODE_ENV === 'production';

const inPath = path.resolve(process.cwd(), config.inDir);
const publicPath = path.resolve(process.cwd(), config.publicDir);

const htmlOutName = `${config.tmpDir}${config.tmpName}.html`;
const scriptName = `${config.tmpDir}sissi-script.js`;
const styleName = 'sissi-styles.css';

module.exports = {
  entry: inPath,
  output: {
    filename: scriptName,
    publicPath: '/',
    path: publicPath,
    library: config.entryComponent,
    libraryTarget: 'umd',
  },
  devtool: isProduction ? false : 'source-maps',
  devServer: {
    contentBase: publicPath,
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
      filename: isProduction ? htmlOutName : `${config.htmlInName}.html`,
      template: path.resolve(publicPath, `${config.htmlInName}.html`),
    }),
    new MiniCssExtractPlugin({
      filename: styleName,
      path: publicPath,
    }),
  ],
};
