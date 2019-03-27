import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const filePaths = {
  content: path.join(process.cwd(), 'content.json'),
  structure: path.join(process.cwd(), 'structure.json'),
}

export function readJson(fileName) {
  return async (req, res) => {
    try {
      const file = await readFileAsync(filePaths[fileName] || `${fileName}.json`);
      const json = JSON.parse(file);
      res.send(json);
    } catch(error) {
      res.send({});
    }
  }
}

export function writeJson(fileName) {
  return async (req, res) => {
    const jsonData = req.body;
    try {
      await writeFileAsync(
        filePaths[fileName] || path.join(process.cwd(), `${fileName}.json`),
        JSON.stringify(jsonData, null, 2)
      );
      res.send(jsonData);
    } catch(error) {
      res.sendStatus(500);
    }
  }
}
