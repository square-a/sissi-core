const fs = require('fs');
const path = require('path');

const defaults = require('./defaults');

let options = { ...defaults };

try {
  const customOptions = fs.readFileSync(path.join(process.cwd(), '.sissi'));

  options = {
    ...options,
    ...customOptions,
  };

} catch (error) {
  console.log('Couldn\'t read your .sissi file. Using default settings.');
}

module.exports = options;
