const path = require('path');

module.exports = {
  extends: 'zweitag',
  settings: {
    react: {
      version: '16.8',
    },
    'import/resolver': {
      alias: [
        ['@', path.resolve(process.cwd(), 'src')],
        ['%', path.resolve(process.cwd(), 'src/cms')]
      ]
    }
  },
  rules: {
    'no-console': 'off',
    'object-curly-spacing': ['error', 'always', {
      arraysInObjects: false,
      objectsInObjects: false,
    }],
    'react/require-default-props': 'off',
  }
}
