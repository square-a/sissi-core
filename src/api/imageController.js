const path = require('path');
const fs = require('fs');
const hash = require('shorthash');

const imageDirectory = path.join(process.cwd(), 'public', 'images');

try {
  fs.statSync(imageDirectory);
} catch (error) {
  fs.mkdirSync(imageDirectory);
}

async function saveFile(files) {
  const file = Object.values(files)[0];

  return new Promise((resolve, reject) => {
    const now = (new Date()).getTime();
    const nameParts = file.name.split('.');
    const hashedName = hash.unique(`${nameParts[0]}${now}`);
    const fileName = `${hashedName}.${nameParts[1].toLowerCase()}`;

    file.mv(`${imageDirectory}/${fileName}`, err => {
      if (err) {
        reject(err);

      } else {
        resolve({ fileName });
      }
    });
  });
}

module.exports = {
  getAllImages(req, res) {
    fs.readdir(imageDirectory, (error, files) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.send(files);
    });
  },
  async saveImage(req, res) {
    if (!req.files) {
      res.sendStatus(400);
      return;
    }

    try {
      const savedFileName = await saveFile(req.files);
      res.send(savedFileName);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
