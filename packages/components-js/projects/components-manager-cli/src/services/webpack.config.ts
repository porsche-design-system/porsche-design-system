import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import type { EntryConfig } from '../../shared-definitions/entry-config';
import { getProjectRootPath } from './config';

export function generateWebPackConfig(targetDirectory: string, config: EntryConfig): webpack.Configuration {
  const entryFile = 'with-prefix.js';
  const { tempEntryPointFilePath, additionalEntryFiles = [], format } = config;

  let additionalFileContents = '';
  if (additionalEntryFiles.length) {
    const listItemPrefix = '  - ';
    console.log(
      `Bundling additional files into entrypoint:\n${listItemPrefix}${additionalEntryFiles
        .map((file) => file.filePath)
        .join(listItemPrefix)}`
    );
    additionalFileContents =
      '\n\n' + additionalEntryFiles.map((file) => fs.readFileSync(file.filePath, 'utf8')).join('\n\n') || '';
  }
  const tmpEntryFileContent = `export * from './${entryFile}'${additionalFileContents}`;

  // webpack needs an actual file, so we create one temporarily which will be deleted afterwards again
  fs.writeFileSync(tempEntryPointFilePath, tmpEntryFileContent);

  const strippedConfig = (({ version, script }) => ({ version, script }))(config);

  const isIifeBuild = format === 'iife';
  const isEsmBuild = format === 'esm';

  const finalConfig: webpack.Configuration = {
    entry: tempEntryPointFilePath,
    ...(isEsmBuild && {
      experiments: {
        outputModule: true,
      },
    }),
    output: {
      path: path.resolve(getProjectRootPath(), targetDirectory, isEsmBuild ? 'esm' : ''),
      filename: 'index.js',
      ...(isEsmBuild
        ? { libraryTarget: 'module' } // esm build for vue
        : {
            ...(isIifeBuild ? { iife: true } : { libraryTarget: 'umd' }), // iife build for getLoaderScript partial, umd build for "old" npm package
            library: 'porscheDesignSystem', // needs to be same as CM_KEY
            globalObject: "typeof self !== 'undefined' ? self : this",
          }),
    },
    // great for debugging:
    // https://browsersl.ist/#q=%3E+0.5%25+and+last+2+versions%2C+not+dead%2C+not+op_mini+all%2C+not+opera+%3E+0%2C+not+Samsung+%3E+0%2C+not+and_uc+%3E+0
    target:
      'browserslist:> 0.5% and last 2 versions, not dead, not op_mini all, not opera > 0, not Samsung > 0, not and_uc > 0',
    plugins: [
      new webpack.DefinePlugin({
        CM_CONFIG: JSON.stringify(strippedConfig),
      }),
    ],
  };

  return finalConfig;
}
