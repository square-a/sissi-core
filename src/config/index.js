const fs = require('fs');
const path = require('path');

const defaults = require('./defaults');

let options = { ...defaults };

try {
  const customOptionsFile = fs.readFileSync(path.join(process.cwd(), '.sissi'));
  const customOptions = JSON.parse(customOptionsFile);

  options = {
    ...options,
    ...customOptions,
  };

} catch (error) {
  console.log('Couldn\'t read your .sissi file. Using default settings.');
}

module.exports = options;
