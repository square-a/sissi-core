const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { sync: mkDirPSync } = require('mkdirp');
const { ncp } = require('ncp');
const rimraf = require('rimraf');

const config = require('@/config');
const Crawler = require('@/utils/Crawler');

global.window = {};

const copyDir = promisify(ncp);
const sissiScriptTag = /<script([^>])*sissi-script([^>])*><\/script>/;

const cwd = process.cwd();
const outPath = path.join(cwd, config.outDir);
const publicPath = path.join(cwd, config.publicDir);
const tmpPath = path.join(publicPath, config.tmpDir);

const contentJsonFile = path.join(cwd, 'content.json');
const templateFile = path.join(tmpPath, 'template.html');
const scriptFile = path.join(tmpPath, 'sissi-script');

const content = require(contentJsonFile);
const templateWithScript = fs.readFileSync(templateFile, 'utf-8');
const Page = require(scriptFile).default;
const template = templateWithScript.replace(sissiScriptTag, '');

module.exports = (async function snapshot() {
  rimraf.sync(outPath);
  fs.mkdirSync(outPath);

  await copyDir(publicPath, outPath, { filter: /^(?!.*_tmp)(?!.*index\.html).*$/ });
  const crawler = new Crawler(Page, content, template);
  const staticPages = await crawler.crawl();

  Object.entries(staticPages).forEach(([pathName, html]) => {
    const dirName = path.join(outPath, pathName);
    const filePath = path.join(dirName, 'index.html');

    mkDirPSync(dirName);
    fs.writeFileSync(filePath, html);
  });
}());
