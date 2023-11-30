const { cdnDistPath, deployUrl, npmDistPath, npmDistTmpPath, version } = require('./environment');

// we are building this package 3 times in 3 different formats: umd, iife and esm
// umd: is the default and main entry point of the shipped package
// esm: needed for vue 3 with vite since it does not like umd bundles, at the same time consumer might be able to tree shake componentsReady
// iife: is a temporary build that is used in our getLoaderScript partial
const isIifeBuild = process.env.IIFE_BUILD === '1';
const isEsmBuild = process.env.ESM_BUILD === '1';
const targetDirectory = isIifeBuild ? npmDistTmpPath : npmDistPath;
const format = isIifeBuild ? 'iife' : isEsmBuild ? 'esm' : 'umd';

const isDev = process.env.PORSCHE_DESIGN_SYSTEM_DEV === '1';
console.log('Environment:', isDev ? 'dev' : 'prod');
console.log('Version:', version);
console.log('Format:', format);
console.log('Deploy URL:', deployUrl);
console.log('Target Directory:', targetDirectory);

// type PorscheWebComponentManagerConfig = {
//   version: string;
//   additionalEntryFiles?: AdditionalEntryFile[];
//   deployUrl?: string;
//   targetDirectory?: string;
//   globalStyles?: GlobalStyles;
//   inlineStyles?: string;
//   script: string;
//   copyFiles?: CopyFile[];
//   format?: 'umd' | 'iife' | 'esm';
// }

module.exports = {
  version,
  targetDirectory,
  deployUrl: deployUrl,
  script: `${cdnDistPath}/porsche-design-system.v*.js`,
  format,
  ...(isEsmBuild && {
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
        pattern: '../../LICENSE.md',
        targetDirectory,
      },
      {
        pattern: '../../OSS_NOTICE',
        targetDirectory,
      },
      {
        pattern: './projects/components-wrapper/README.md',
        targetDirectory,
      },
    ],
  }),
  ...(!isIifeBuild && {
    additionalEntryFiles: [
      {
        filePath: '../components/dist/collection/components-ready.js',
        typingFilePath: '../components/dist/types/components-ready.d.ts',
      },
    ],
  }),
};
