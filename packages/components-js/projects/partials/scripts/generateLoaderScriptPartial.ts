import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../components-wrapper/environment';

// TODO: cdn option missing?
export const generateLoaderScriptPartial = (): string => {
  const types = `type GetLoaderScriptOptions = {
  prefix?: string | string[];
  format?: FormatWithCSP;
};`;

  // temporary core loader built into this package's dist; resolve from this package's own folder
  // (not require.resolve, whose self-symlink resolves differently across install layouts / CI)
  const tmpFilePath = path.resolve(__dirname, '../../..', npmDistTmpSubPath, 'index.js');
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
    ? (Array.isArray(prefix) ? prefix : [prefix]).map((x) => \`porscheDesignSystem.load({prefix:'\${x}'})\`).join(';')
    : 'porscheDesignSystem.load()';
  const scriptContent = ${JSON.stringify(fileContent)} + loadCalls;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'sha256'
    ? getSha256Hash(scriptContent)
    : format === 'html'
      ? \`<script \$\{scriptAttributes\}>\${scriptContent}</script>\`
      : <script {...scriptProps} dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}`;

  return [types, func].join('\n\n');
};
