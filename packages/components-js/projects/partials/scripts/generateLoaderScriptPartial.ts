import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../components-wrapper/environment';

// TODO: cdn option missing?
export const generateLoaderScriptPartial = (): string => {
  const types = `type GetLoaderScriptOptions = {
  prefix?: string | string[];
  format?: Format;
};`;

  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(componentsJsFilePath, '../..');
  const tmpFilePath = path.resolve(packageDir, '../..', npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

  const func = `export function getLoaderScript(opts: GetLoaderScriptOptions & { format: 'jsx' }): JSX.Element;
export function getLoaderScript(opts?: GetLoaderScriptOptions): string;
export function getLoaderScript(opts?: GetLoaderScriptOptions): string | JSX.Element {
  const { prefix, format }: GetLoaderScriptOptions = {
    prefix: undefined,
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getLoaderScript');

  const scriptProps = { 'data-pds-loader-script': '' };
  const scriptAttributes = convertPropsToAttributeString(scriptProps);

  const loadCalls = prefix
    ? Array.isArray(prefix)
      ? prefix.map((x) => \`porscheDesignSystem.load({prefix:'\${x}'})\`).join(';')
      : \`porscheDesignSystem.load({prefix:'\${prefix}'})\`
    : 'porscheDesignSystem.load()';
  const scriptContent = ${JSON.stringify(fileContent)} + loadCalls;

  generatePartialHash('getLoaderScript', scriptContent);

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'html'
    ? \`<script \$\{scriptAttributes\}>\${scriptContent}</script>\`
    : <script {...scriptProps} dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}`;

  return [types, func].join('\n\n');
};
