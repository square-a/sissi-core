const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const chalk = require('chalk');

const cmsConfig = require('@/config/cms');
const { init } = require('./authService');
const migrateContent = require('./migrateContent');
const router = require('./router');

let config = require('@/config');

const isSissiCms = process.env.SISSI_CMS != null;

if (isSissiCms) {
  config = require('@/config/cms');
}

const cmsDir = path.join(__dirname, '../..', cmsConfig.publicDir);
const imageDirectory = path.join(process.cwd(), config.publicDir, 'images');

module.exports = async function startCms(serveFrontend = true) {
  const app = express();
  let message = `API running on ${chalk.underline(`http://localhost:${config.cmsPort}/api`)}`;

  app.use(init());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());

  app.use('/api', router);
  app.use('/images', express.static(imageDirectory));

  if (serveFrontend) {
    message = `Visit the CMS at ${chalk.underline(`http://localhost:${config.cmsPort}`)}`;
    app.use('/', express.static(cmsDir));
    app.get('*', (req, res) => res.sendFile(path.join(cmsDir, `${cmsConfig.tmpName}.html`)));
  }

  try {
    await migrateContent();

  } catch (error) {
    console.log(error);
    return;
  }

  app.listen(config.cmsPort, () => console.log(message));
};
