const { cdnDistPath, npmDistPath, deployUrl, version } = require('./projects/components-wrapper/environment');

module.exports = {
  name: 'porscheDesignSystem',
  supportPrefixes: true,
  version: version,
  targetDirectory: npmDistPath,
  deployUrl: deployUrl,
  scripts: [
    {
      module: true,
      pattern: `${cdnDistPath}/porsche-design-system.v*.js`
    }
  ],
  copyFiles: [
    {
      pattern: '../components/CHANGELOG.md',
      targetDirectory: npmDistPath
    },
    {
      pattern: './projects/components-wrapper/package.json',
      targetDirectory: npmDistPath
    },
    {
      pattern: './projects/components-wrapper/LICENSE',
      targetDirectory: npmDistPath
    },
    {
      pattern: './projects/components-wrapper/README.md',
      targetDirectory: npmDistPath
    }
  ]
};
