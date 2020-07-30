const environment = require('./projects/components-wrapper/environment');

module.exports = {
  name: 'porscheDesignSystem',
  supportPrefixes: true,
  version: environment.version,
  targetDirectory: environment.npmDistPath,
  deployUrl: environment.deployUrl,
  scripts: [
    {
      module: true,
      pattern: `${environment.cdnDistPath}/porsche-design-system.v*.js`
    }
  ],
  copyFiles: [
    {
      pattern: '../components/CHANGELOG.md',
      targetDirectory: `${environment.npmDistPath}/`
    },
    {
      pattern: 'projects/components-wrapper/package.json',
      targetDirectory: `${environment.npmDistPath}/`
    },
    {
      pattern: 'projects/components-wrapper/LICENSE',
      targetDirectory: `${environment.npmDistPath}/`
    },
    {
      pattern: 'projects/components-wrapper/README.md',
      targetDirectory: `${environment.npmDistPath}/`
    }
  ]
};
