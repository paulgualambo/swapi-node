module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  testEnvironment: 'node',
  testRegex: './tests/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/tests'],
};
