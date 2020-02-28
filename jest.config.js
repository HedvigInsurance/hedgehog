module.exports = {
  transform: {
    '\\.tsx?$': 'babel-jest',
  },
  testRegex: '\\.test\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src', 'shared'],
  setupFiles: ['<rootDir>/test-setup-enzyme.js'],
}
