import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../components-wrapper/environment';
import { withoutTagsOption } from './utils';

export const generateLoaderScriptPartial = (): string => {
  const types = `type GetLoaderScript = {
  prefix?: string | string[];
  ${withoutTagsOption}
  format?: Format;
};
type GetLoaderScriptFormatHtml = Omit<GetLoaderScript, 'withoutTags'> & {
  format: 'html';
};
type GetLoaderScriptFormatJsx = Omit<GetLoaderScript, 'withoutTags'> & {
   format: 'jsx';
};
type GetLoaderScriptWithoutTags = Omit<GetLoaderScript, 'format'>;`;

  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

  const func = `export function getLoaderScript(opts?: GetLoaderScriptFormatHtml): string;
export function getLoaderScript(opts?: GetLoaderScriptFormatJsx): JSX.Element;
export function getLoaderScript(opts?: GetLoaderScriptWithoutTags): string;
export function getLoaderScript(opts?: GetLoaderScript): string | JSX.Element {
  const { prefix, withoutTags, format }: GetLoaderScript = {
    prefix: undefined,
    withoutTags: false,
    format: 'html',
    ...opts
  };

  const loadCalls = prefix
    ? Array.isArray(prefix)
      ? prefix.map((x) => \`porscheDesignSystem.load({prefix:'\${x}'})\`).join(';')
      : \`porscheDesignSystem.load({prefix:'\${prefix}'})\`
    : 'porscheDesignSystem.load()';
  const scriptContent = ${JSON.stringify(fileContent)} + loadCalls;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  const markup = format === 'html' ? \`<script>\${scriptContent}</script>\` : <script dangerouslySetInnerHTML={{__html: scriptContent}} />;

  return withoutTags ? scriptContent : markup;
}`;

  return [types, func].join('\n\n');
};
