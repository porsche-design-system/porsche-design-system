const { cdnDistPath, deployUrl, npmDistPath, npmDistTmpPath, version } = require('./environment');

const isTmpBuild = process.env.TMP_BUILD === '1';
const targetDirectory = isTmpBuild ? npmDistTmpPath : npmDistPath;

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');
console.log('Version:', version);
console.log('Deploy URL:', deployUrl);
console.log('targetDirectory:', deployUrl);

// type PorscheWebComponentManagerConfig = {
//   version: string;
//   additionalEntryFiles?: AdditionalEntryFile[];
//   deployUrl?: string;
//   targetDirectory?: string;
//   globalStyles?: GlobalStyles;
//   inlineStyles?: string;
//   script: string;
//   copyFiles?: CopyFile[];
//   iife?: boolean;
// }

module.exports = {
  version,
  targetDirectory,
  deployUrl: deployUrl,
  script: `${cdnDistPath}/porsche-design-system.v*.js`,
  ...(isTmpBuild
    ? { iife: true }
    : {
        copyFiles: [
          {
            pattern: '../components/CHANGELOG.md',
            targetDirectory,
          },
          {
            pattern: './projects/components-wrapper/package.json',
            targetDirectory,
          },
          {
            pattern: './projects/components-wrapper/LICENSE',
            targetDirectory,
          },
          {
            pattern: './projects/components-wrapper/README.md',
            targetDirectory,
          },
        ],
        additionalEntryFiles: [
          {
            filePath: '../components/dist/collection/components-ready.js',
            typingFilePath: '../components/dist/types/components-ready.d.ts',
          },
        ],
      }),
};
