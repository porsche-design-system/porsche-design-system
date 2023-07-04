import * as fs from 'fs';
import * as path from 'path';

export const generateCookiesFallbackScriptPartial = (): string => {
  const types = `type GetCookiesFallbackScriptOptions = {
  cdn?: Cdn;
  format?: Format;
};`;

  const fallbacksFilePath = require.resolve('@porsche-design-system/fallbacks');
  const packageDir = path.resolve(path.dirname(fallbacksFilePath), '..');
  const tmpFilePath = path.resolve(packageDir, 'dist/loader', 'cookies.js');
  const fileContent = fs
    .readFileSync(tmpFilePath, 'utf8')
    .replace('https://cdn.ui.porsche.com', '${cdnBaseUrl}')
    .trim();

  const func = `export function getCookiesFallbackScript(opts: GetCookiesFallbackScriptOptions & { format: 'jsx' }): JSX.Element;
export function getCookiesFallbackScript(opts?: GetCookiesFallbackScriptOptions): string;
export function getCookiesFallbackScript(opts?: GetCookiesFallbackScriptOptions): string | JSX.Element {
  const { cdn, format }: GetCookiesFallbackScriptOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getCookiesFallbackScript');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const scriptContent = \`${fileContent}\`;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'html'
    ? \`<script>\${scriptContent}</script>\`
    : <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}`;

  return [types, func].join('\n\n');
};
