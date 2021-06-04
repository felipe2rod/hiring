module.exports = {
  bail: true,
  clearMocks: true,

  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js?(x)',
  //   '**/?(*.)+(spec|test).[tj]s?(x)'
  ],

  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/',
  ],
};
