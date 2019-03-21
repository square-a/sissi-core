const path = require('path');

module.exports = {
  extends: 'zweitag',
  settings: {
    react: {
      version: '0',
    },
    'import/resolver': {
      alias: [
        ['@', path.resolve(process.cwd(), 'src')]
      ]
    }
  },
  rules: {
    'no-console': 'off',
    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: false,
      objectsInObjects: false,
    }],
  }
}
