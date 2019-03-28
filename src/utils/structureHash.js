const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const readJson = require('@/utils/readJson');

const HASH_FILE_NAME = '.sthash';
const hashPath = path.join(process.cwd(), HASH_FILE_NAME);

module.exports = {
  createStructureHash(doWrite = false) {
    const structurePath = path.join(process.cwd(), 'structure.json');
    const { error: strError, file: structure } = readJson(structurePath);

    if (strError) {
      console.log(strError);
      return null;
    }

    const structureString = JSON.stringify(structure);
    const stHash = createHash('sha256').update(structureString).digest('hex');

    if (doWrite) {
      fs.writeFileSync(hashPath, stHash);
    }

    return stHash;
  },

  hasStructureChanges() {
    let prevHash;
    try {
      prevHash = fs.readFileSync(hashPath, 'utf-8').trim();
    } catch (e) {
      prevHash = '';
    }
    const newHash = this.hashStructure();
    if (newHash === prevHash) {
      return false;
    }

    return true;
  },
};
