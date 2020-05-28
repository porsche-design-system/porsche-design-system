const environment = require('./environment');

module.exports = {
  name: 'porscheDesignSystem',
  supportPrefixes: true,
  version: environment.version,
  targetDirectory: environment.npmDistPath,
  deployUrl: environment.deployUrl,
  scripts: [
    {
      module: true,
      pattern: `${environment.cdnDistPath}/porsche-design-system.*.js`
    },
    {
      module: false,
      pattern: `${environment.cdnDistPath}/porsche-design-system.*.js`
    }
  ],
  copyFiles: [
    {
      pattern: 'CHANGELOG.md',
      targetDirectory: `${environment.npmDistPath}/`
    },
    {
      pattern: 'src/package.json',
      targetDirectory: `${environment.npmDistPath}/`
    }
  ]
};
