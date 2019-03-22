const path = require('path');
const { createHash } = require('crypto');

const readJson = require('@/utils/readJson');

module.exports = function hashStructure() {
  const structurePath = path.join(process.cwd(), 'structure.json');
  const { error: strError, file: structure } = readJson(structurePath);

  if (strError) {
    console.log(strError);
    return null;
  }

  const structureString = JSON.stringify(structure);
  const stHash = createHash('sha256').update(structureString).digest('hex');

  return stHash;
};
