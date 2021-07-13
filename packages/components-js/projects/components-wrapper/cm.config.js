const { cdnDistPath, deployUrl, npmDistPath, npmDistTmpPath, version } = require('./environment');

console.log('Version:', version);
console.log('Deploy URL:', deployUrl);

const isTpmBuild = process.env.TMP_BUILD === '1';

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
  targetDirectory: isTpmBuild ? npmDistTmpPath : npmDistPath,
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
  ...(!isTpmBuild && {
    additionalEntryFiles: [
      {
        filePath: '../components/dist/collection/components-ready.js',
        typingFilePath: '../components/dist/types/components-ready.d.ts',
      },
    ],
  }),
};
