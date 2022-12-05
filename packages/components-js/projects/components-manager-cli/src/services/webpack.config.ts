import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import { EntryConfig } from '../../shared-definitions/entry-config';
import { getProjectRootPath } from './config';

export function generateWebPackConfig(targetDirectory: string, config: EntryConfig): webpack.Configuration {
  const entryFile = 'with-prefix.js';
  const { tempEntryPointFilePath, additionalEntryFiles = [], iife } = config;

  let additionalFileContents = '';
  if (additionalEntryFiles.length) {
    const listItemPrefix = '  - ';
    console.log(
      `Bundling additional files into entrypoint:\n${listItemPrefix}${additionalEntryFiles
        .map((file) => file.filePath)
        .join(listItemPrefix)}`
    );
    additionalFileContents =
      '\n\n' + additionalEntryFiles.map((file) => fs.readFileSync(file.filePath, 'utf8')).join('\n\n') ?? '';
  }
  const tmpEntryFileContent = `export * from './${entryFile}'${additionalFileContents}`;

  // webpack needs an actual file, so we create one temporarily which will be deleted afterwards again
  fs.writeFileSync(tempEntryPointFilePath, tmpEntryFileContent);

  const strippedConfig = (({ version, script }) => ({ version, script }))(config);

  const finalConfig: webpack.Configuration = {
    entry: tempEntryPointFilePath,
    ...(!iife && {
      experiments: {
        outputModule: true,
      },
    }),
    output: {
      path: path.resolve(getProjectRootPath(), targetDirectory),
      filename: 'index.js',

      ...(iife
        ? {
            iife: true,
            library: 'porscheDesignSystem', // needs to be same as CM_KEY
          }
        : { libraryTarget: 'module' }), // iife build for getLoaderScript partial, module build for npm package
      // globalObject: "typeof self !== 'undefined' ? self : this",
    },
    plugins: [
      new webpack.DefinePlugin({
        CM_CONFIG: JSON.stringify(strippedConfig),
      }),
    ],
  };

  return finalConfig;
}
