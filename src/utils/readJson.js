const fs = require('fs');

export function readJson(path, createIfNotExists) {
  try {
    const file = fs.readFileSync(path);
    return {
      error: false,
      file: JSON.parse(file.toString()),
    };

  } catch (error) {
    if (error.code === 'ENOENT') {
      if (createIfNotExists) {
        fs.writeFileSync(path, '{}');
        return {
          file: {},
        };
      }

      return {
        error: `File not found. Are you sure it exists? [${path}]`,
      };

    } else if (error.toString().includes('SyntaxError')) {
      return {
        error: `Couldn't parse file. Please check for a valid JSON format. [${path}]`,
      };
    }

    return {
      error: 'Couldn\'t read file.',
    };
  }
}
