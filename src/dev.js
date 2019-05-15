const chalk = require('chalk');

const startCms = require('@/api');
const webpack = require('@/commands/webpack');

module.exports = (async function run() {
  try {
    const address = await webpack('development');
    console.log(`Visit the CMS on ${chalk.underline(address)}`);

    startCms(false);

  } catch (error) {
    console.log(error);
  }
}());
