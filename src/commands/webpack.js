const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('@/config/webpack');

const devServerConfig = webpackConfig.devServer;

module.exports = mode => new Promise((resolve, reject) => {
  if (mode === 'production') {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);

      } else if (stats.hasErrors()) {
        const info = stats.toJson();
        return reject(info.errors);
      }

      return resolve();
    });

  } else if (mode === 'development') {
    const compiler = webpack(webpackConfig);
    const webpackServer = new WebpackDevServer(compiler, devServerConfig);

    webpackServer.listen(devServerConfig.port, '127.0.0.1', err => {
      if (err) {
        return reject(err);
      }

      return resolve(`http://localhost:${devServerConfig.port}`);
    });
  }
});
