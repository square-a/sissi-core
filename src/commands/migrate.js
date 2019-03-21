const fs = require('fs');
const path = require('path');

const Content = require('@/migrations/Content');
const readJson = require('@/utils/readJson');

module.exports = async function migrate() {
  const contentPath = path.join(process.cwd(), 'content.json');
  const structurePath = path.join(process.cwd(), 'structure.json');

  const { error: strError, file: structure } = readJson(structurePath);
  if (strError) {
    console.log(strError);
    return;
  }

  const { error: cntError, file: content } = readJson(contentPath, true);
  if (cntError) {
    console.log(cntError);
    return;
  }

  const newContent = new Content(content, structure);

  newContent
    .migratePages()
    .migrateSections()
    .migrateFields();

  const isInitialContent = JSON.stringify(content) === '{}';
  const hasContentChanged = JSON.stringify(content) !== JSON.stringify(newContent.getContent());

  if (hasContentChanged) {
    let message = 'New content.json created.';

    if (!isInitialContent) {
      fs.copyFileSync(contentPath, `${contentPath}.backup`);
      message += ' Backup saved as content.json.backup';
    }

    fs.writeFileSync(contentPath, JSON.stringify(newContent.getContent(), null, 2));
    console.log(message);
  }
};
