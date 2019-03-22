const fs = require('fs');
const path = require('path');

const Content = require('@/migrations/Content');
const readJson = require('@/utils/readJson');

const contentPath = path.join(process.cwd(), 'content.json');
const structurePath = path.join(process.cwd(), 'structure.json');

module.exports = async function migrate() {
  const { error: strError, file: structure } = readJson(structurePath);
  if (strError) {
    console.log(strError);
    return null;
  }

  const { error: cntError, file: content } = readJson(contentPath, true);
  if (cntError) {
    console.log(cntError);
    return null;
  }

  const newContent = new Content(content, structure);

  newContent
    .migratePages()
    .migrateSections()
    .migrateFields();

  const isInitialContent = JSON.stringify(content) === '{}';
  const hasContentChanged = JSON.stringify(content) !== JSON.stringify(newContent.getContent());

  if (hasContentChanged) {
    console.log('New content.json created.');

    if (!isInitialContent) {
      fs.copyFileSync(contentPath, `${contentPath}.backup`);
      console.log('Backup saved as content.json.backup');
    }

    return JSON.stringify(newContent.getContent(), null, 2);
  }
};
