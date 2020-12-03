const { cdnDistPath, npmDistPath, deployUrl, version } = require('./projects/components-wrapper/environment');

console.log('Version:', version);
console.log('Deploy URL:', deployUrl);

// interface PorscheWebComponentManagerConfig extends CommonConfig {
//   deployUrl?: string;
//   targetDirectory?: string;
//   supportPrefixes?: boolean;
//   globalStyles?: GlobalStyles;
//   inlineStyles?: string;
//   scripts?: DifferentialLoadingScripts[];
//   copyFiles: CopyFile[];
// }
module.exports = {
  name: 'porscheDesignSystem',
  supportPrefixes: true,
  version: version,
  targetDirectory: npmDistPath,
  deployUrl: deployUrl,
  scripts: [
    {
      module: true,
      pattern: `${cdnDistPath}/porsche-design-system.v*.js`,
    },
  ],
  copyFiles: [
    {
      pattern: '../components/CHANGELOG.md',
      targetDirectory: npmDistPath,
    },
    {
      pattern: './projects/components-wrapper/package.json',
      targetDirectory: npmDistPath,
    },
    {
      pattern: './projects/components-wrapper/LICENSE',
      targetDirectory: npmDistPath,
    },
    {
      pattern: './projects/components-wrapper/README.md',
      targetDirectory: npmDistPath,
    },
  ],
};
