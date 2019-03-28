const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const HASH_FILE_NAME = '.sthash';
const hashPath = path.join(process.cwd(), HASH_FILE_NAME);

const pkgPath = path.join(__dirname, '..');
const ownPkgBin = path.join(pkgPath, 'node_modules/.bin/sissi-moves');
const parentPkgBin = path.join(pkgPath, '..', '.bin/sissi-moves');

const movesBin = fs.existsSync(ownPkgBin) ? ownPkgBin : parentPkgBin;

export default function migrateContent() {
  return new Promise((resolve, reject) => {
    let prevHash = '';
    try {
      prevHash = fs.readFileSync(hashPath, 'utf-8').trim();
    // eslint-disable-next-line no-empty
    } catch (e) {}

    execFile(movesBin, [
      'hash',
    ], (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(error || stderr);
      }
      const newHash = stdout.trim();

      if (newHash === prevHash) {
        return resolve();
      }

      execFile(movesBin, [
        'migrate',
      ], (error, stdout, stderr) => {
        if (error || stderr) {
          return reject(error || stderr);
        }
        if (stdout) {
          console.log(stdout);
        }
        resolve();
      });
    });
  });
}

export async function migrateContentMiddleware(req, res, next) {
  try {
    await migrateContent();
    next();

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
