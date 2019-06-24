const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

let config = require('@/config');

const isSissiCms = process.env.SISSI_CMS != null;

if (isSissiCms) {
  config = require('@/config/cms');
}

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
  devtool: (isSissiCms && !isProduction) ? 'source-maps' : false,
  devServer: {
    contentBase: publicPath,
    publicPath: '/',
    historyApiFallback: true,
    port: config.devPort,
    stats: isSissiCms
      ? 'normal'
      : {
        entrypoints: false,
        chunkGroups: false,
        modules: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        depth: false,
        env: false,
        reasons: false,
        usedExports: false,
        providedExports: false,
        optimizationBailout: false,
        errorDetails: false,
        publicPath: false,
        exclude: false,
        maxModules: 0,
      },
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: ['@babel/preset-react'],
          cacheDirectory: true,
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
