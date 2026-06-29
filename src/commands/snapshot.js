const fs = require('fs');
const path = require('path');

const config = require('@/config');
const Crawler = require('@/utils/Crawler');

global.window = {
  performance: {
    now: Date.now,
  },
};
global.self = global.window;
global.performance = global.window.performance;
const sissiScriptTag = /<script([^>])*sissi-script([^>])*><\/script>/;

const shouldCopyPath = (publicPath, sourcePath) => {
  const relativePath = path.relative(publicPath, sourcePath);

  if (!relativePath) {
    return true;
  }

  return !relativePath.includes('_tmp') && !relativePath.includes('index.html');
};

const copyDirContents = (sourceDir, destinationDir, publicPath) => {
  fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(entry => {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (!shouldCopyPath(publicPath, sourcePath)) {
      return;
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(destinationPath, { recursive: true });
      copyDirContents(sourcePath, destinationPath, publicPath);
      return;
    }

    fs.copyFileSync(sourcePath, destinationPath);
  });
};

const requireNoCache = filePath => {
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
};

module.exports = async function snapshot() {
  const cwd = process.cwd();
  const outPath = path.join(cwd, config.outDir);
  const publicPath = path.join(cwd, config.publicDir);
  const tmpPath = path.join(publicPath, config.tmpDir);

  const contentJsonFile = path.join(cwd, 'content.json');
  const templateFile = path.join(tmpPath, 'template.html');
  const scriptFile = path.join(tmpPath, 'sissi-script');

  const content = requireNoCache(contentJsonFile);
  const templateWithScript = fs.readFileSync(templateFile, 'utf-8');
  const Page = requireNoCache(scriptFile).default;
  const template = templateWithScript.replace(sissiScriptTag, '');

  fs.rmSync(outPath, { recursive: true, force: true });
  fs.mkdirSync(outPath, { recursive: true });

  copyDirContents(publicPath, outPath, publicPath);
  const crawler = new Crawler(Page, content, template);
  const staticPages = await crawler.crawl();

  Object.entries(staticPages).forEach(([pathName, html]) => {
    const dirName = path.join(outPath, pathName);
    const filePath = path.join(dirName, 'index.html');

    fs.mkdirSync(dirName, { recursive: true });
    fs.writeFileSync(filePath, html);
  });
};
