const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const readJson = require('@/utils/readJson');

module.exports = function hashStructure(doSave) {
  const structurePath = path.join(process.cwd(), 'structure.json');
  const hashPath = path.join(process.cwd(), '.sthash');
  const { error: strError, file: structure } = readJson(structurePath);

  if (strError) {
    console.log(strError);
    return;
  }

  const structureString = JSON.stringify(structure);
  const stHash = createHash('sha256').update(structureString).digest('hex');

  if (doSave) {
    fs.writeFileSync(hashPath, stHash);

  } else {
    console.log(stHash);
  }
};
