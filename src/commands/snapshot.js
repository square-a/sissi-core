import fs from 'fs';
import path from 'path';
import { sync as mkDirPSync } from 'mkdirp';

import config from '@/config';
import Crawler from '@/utils/Crawler';

const sissiScriptTag = /<script([^>])*sissi-script([^>])*><\/script>/;

const cwd = process.cwd();
const outPath = path.join(cwd, config.buildDir);
const tmpPath = path.join(cwd, config.publicDir, config.tmpDir);

const contentJsonFile = path.join(cwd, 'content.json');
const templateFile = path.join(tmpPath, 'template.html');
const scriptFile = path.join(tmpPath, 'sissi-script');

const content = require(contentJsonFile);
const templateWithScript = fs.readFileSync(templateFile, 'utf-8');
const Page = require(scriptFile).default;

const template = templateWithScript.replace(sissiScriptTag, '');

module.exports = async function snapshot() {

  const crawler = new Crawler(Page, content, template);
  const staticPages = await crawler.crawl();

  Object.entries(staticPages).forEach(([pathName, html]) => {
    const dirName = path.join(outPath, pathName);
    const filePath = path.join(dirName, 'index.html');

    mkDirPSync(dirName);
    fs.writeFileSync(filePath, html);
  });

  // TODO: Copy everything except _tmp from public path to outPath
};
