const { cdnDistPath, npmDistPath, deployUrl, version } = require('./environment');

console.log('Version:', version);
console.log('Deploy URL:', deployUrl);

// type PorscheWebComponentManagerConfig = {
//   version: string;
//   additionalEntryFiles?: AdditionalEntryFile[];
//   deployUrl?: string;
//   targetDirectory?: string;
//   globalStyles?: GlobalStyles;
//   inlineStyles?: string;
//   script: string;
//   copyFiles?: CopyFile[];
// }

module.exports = {
  version: version,
  targetDirectory: npmDistPath,
  deployUrl: deployUrl,
  script: `${cdnDistPath}/porsche-design-system.v*.js`,
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
  additionalEntryFiles: [
    {
      filePath: '../components/dist/collection/components-ready.js',
      typingFilePath: '../components/dist/types/components-ready.d.ts',
    },
  ],
};
