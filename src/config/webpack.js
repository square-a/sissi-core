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
    globalObject: 'this',
    publicPath: '/',
    path: publicPath,
    library: {
      name: config.entryComponent,
      type: 'umd',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '%': path.resolve(process.cwd(), 'src/cms'),
    },
    extensions: ['.js', '.jsx'],
  },
  devtool: (isSissiCms && !isProduction) ? 'source-map' : false,
  devServer: {
    host: '127.0.0.1',
    static: {
      directory: publicPath,
      publicPath: '/',
    },
    historyApiFallback: true,
    port: config.devPort,
    devMiddleware: {
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
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: false,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv({
                  autoprefixer: { grid: true },
                })],
              },
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
    }),
  ],
};
