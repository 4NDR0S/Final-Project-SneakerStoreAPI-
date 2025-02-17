module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  modulePaths: ['<rootDir>/node_modules'],
  moduleDirectories: ['node_modules'],
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
}
