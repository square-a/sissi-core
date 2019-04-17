const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const chalk = require('chalk');

const config = require('@/config');
const cmsConfig = require('@/config/cms');
const { init } = require('./authService');
const migrateContent = require('./migrateContent');
const router = require('./router');

const cmsDir = path.join(__dirname, '../..', cmsConfig.publicDir);
const imageDirectory = path.join(process.cwd(), 'public', 'images');

module.exports = async function startCms() {
  const app = express();

  app.use(init());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());

  app.use('/api', router);
  app.use('/', express.static(cmsDir));
  app.use('/images', express.static(imageDirectory));
  app.get('*', (req, res) => res.sendFile(path.join(cmsDir, `${cmsConfig.tmpName}.html`)));

  try {
    await migrateContent();

  } catch (error) {
    console.log(error);
    return;
  }

  app.listen(config.cmsPort, () => console.log(`Visit the CMS at ${chalk.underline(`http://localhost:${config.cmsPort}`)}`));
};
