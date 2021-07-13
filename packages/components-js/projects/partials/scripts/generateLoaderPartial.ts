import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../components-wrapper/environment';

export const generateLoaderPartial = (): string => {
  const types = `type LoaderOptions = {
  withoutTags?: boolean;
}`;

  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

  const func = `export const getLoader = (opts?: LoaderOptions): string => {
  const options: LoaderOptions = {
    withoutTags: false,
    ...opts
  };
  const { withoutTags } = options;

  const scriptContent = ${JSON.stringify(fileContent)};

  return withoutTags ? scriptContent : \`<script>\${scriptContent}</script>\`;
};`;

  return [types, func].join('\n\n');
};
