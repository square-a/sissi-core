const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const chalk = require('chalk');

const config = require('@/config');
const { init } = require('./authService');
const migrateContent = require('./migrateContent');
const router = require('./router');

const cmsDir = path.join(__dirname, '../..', 'sissi-lib');
const imageDirectory = path.join(process.cwd(), 'public', 'images');

module.exports = async function run() {
  const app = express();

  app.use(init());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());

  app.use('/api', router);
  app.use('/', express.static(cmsDir));
  app.use('/images', express.static(imageDirectory));
  app.get('*', (req, res) => res.sendFile(path.join(cmsDir, 'index.html')));

  try {
    await migrateContent();

  } catch (error) {
    console.log(error);
    return;
  }

  app.listen(config.cmsPort, () => console.log(`Visit the CMS at ${chalk.underline(`http://localhost:${config.cmsPort}`)}`));
};
