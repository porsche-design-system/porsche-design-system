import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../components-wrapper/environment';

export const generateLoaderScriptPartial = (): string => {
  const types = `type LoaderScriptOptions = {
  prefix?: string | string[];
  withoutTags?: boolean;
}`;

  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

  const func = `export const getLoaderScript = (opts?: LoaderScriptOptions): string => {
  const options: LoaderScriptOptions = {
    prefix: undefined,
    withoutTags: false,
    ...opts
  };
  const { prefix, withoutTags } = options;

  const loadCalls = prefix
    ? Array.isArray(prefix)
      ? prefix.map((x) => \`porscheDesignSystem.load({prefix:'\${x}'})\`).join(';')
      : \`porscheDesignSystem.load({prefix:'\${prefix}'})\`
    : 'porscheDesignSystem.load()';
  const scriptContent = ${JSON.stringify(fileContent)} + loadCalls;

  return withoutTags ? scriptContent : \`<script>\${scriptContent}</script>\`;
};`;

  return [types, func].join('\n\n');
};
