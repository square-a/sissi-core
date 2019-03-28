const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const filePaths = {
  content: path.join(process.cwd(), 'content.json'),
  structure: path.join(process.cwd(), 'structure.json'),
};

module.exports = {
  readJson(fileName) {
    return async (req, res) => {
      try {
        const file = await readFileAsync(filePaths[fileName] || `${fileName}.json`);
        const json = JSON.parse(file);
        res.send(json);

      } catch (error) {
        res.send({});
      }
    };
  },
  writeJson(fileName) {
    return async (req, res) => {
      const jsonData = req.body;
      try {
        await writeFileAsync(
          filePaths[fileName] || path.join(process.cwd(), `${fileName}.json`),
          JSON.stringify(jsonData, null, 2)
        );
        res.send(jsonData);

      } catch (error) {
        res.sendStatus(500);
      }
    };
  },
};
