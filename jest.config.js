module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__testSetup__/setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src$1',
    '^%/(.*)$': '<rootDir>/src/cms$1',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
  ],
};
