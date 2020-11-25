const { cdnDistPath, npmDistPath, deployUrl, version } = require('./environment');

console.log('Version:', version);
console.log('Deploy URL:', deployUrl);

// type PorscheWebComponentManagerConfig = CommonConfig & {
//   deployUrl?: string;
//   targetDirectory?: string;
//   supportPrefixes?: boolean;
//   globalStyles?: GlobalStyles;
//   inlineStyles?: string;
//   scripts?: DifferentialLoadingScripts[];
//   copyFiles?: CopyFile[];
//   additionalEntryFiles?: {
//     filePath: string;
//     typingFilePath?: string;
//   }[];
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
  additionalEntryFiles: [
    {
      filePath: '../components/dist/collection/components-ready.js',
      typingFilePath: '../components/dist/types/components-ready.d.ts',
    },
  ],
};
