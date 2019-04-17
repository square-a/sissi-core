const chalk = require('chalk');

const startCms = require('@/api');
const snapshot = require('@/commands/snapshot');
const webpack = require('@/commands/webpack');

module.exports = async function run(args) {
  if (args.includes('start')) {
    try {
      console.log(`Let me just take some ${chalk.underline('snapshots')}...`);
      await webpack('production');
      await snapshot();
      console.log('Done!');

      startCms();

    } catch (error) {
      console.log(error);
    }

  } else if (args.includes('dev')) {
    try {
      const address = await webpack('development');
      console.log(`Visit the page on ${chalk.underline(address)}`);

      startCms();

    } catch (error) {
      console.log(error);
    }

  }
};
