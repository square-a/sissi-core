const fs = require('fs');
const path = require('path');

const Content = require('@/migrations/Content');
const readJson = require('@/utils/readJson');
const structureHash = require('@/utils/structureHash');

const contentPath = path.join(process.cwd(), 'content.json');
const structurePath = path.join(process.cwd(), 'structure.json');

module.exports = async function migrateContent() {
  if (!structureHash.hasStructureChanges()) {
    return;
  }

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

  const oldContentStr = JSON.stringify(content);
  const isInitialContent = oldContentStr === '{}';
  const hasContentChanged = oldContentStr !== JSON.stringify(newContent.getContent());

  if (hasContentChanged) {
    console.log('New content.json created.');

    if (!isInitialContent) {
      fs.copyFileSync(contentPath, `${contentPath}.backup`);
      console.log('Backup saved as content.json.backup');
    }

    fs.writeFileSync(contentPath, JSON.stringify(newContent.getContent(), null, 2));
  }
};
