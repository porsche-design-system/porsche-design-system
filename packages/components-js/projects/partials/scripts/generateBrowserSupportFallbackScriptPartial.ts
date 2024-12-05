import * as fs from 'fs';
import * as path from 'path';

export const generateBrowserSupportFallbackScriptPartial = (): string => {
  const types = `type GetBrowserSupportFallbackScriptOptions = {
  cdn?: Cdn;
  format?: FormatWithCSP;
};`;

  const fallbacksFilePath = require.resolve('@porsche-design-system/fallbacks');
  const packageDir = path.resolve(path.dirname(fallbacksFilePath), '..');
  const tmpFilePath = path.resolve(packageDir, 'dist/loader', 'browser-support.js');
  const fileContent = fs
    .readFileSync(tmpFilePath, 'utf8')
    .replace('https://cdn.ui.porsche.com', '${cdnBaseUrl}')
    .trim();

  const func = `export function getBrowserSupportFallbackScript(opts: GetBrowserSupportFallbackScriptOptions & { format: 'jsx' }): JSX.Element;
export function getBrowserSupportFallbackScript(opts?: GetBrowserSupportFallbackScriptOptions): string;
export function getBrowserSupportFallbackScript(opts?: GetBrowserSupportFallbackScriptOptions): string | JSX.Element {
  const { cdn, format }: GetBrowserSupportFallbackScriptOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getBrowserSupportFallbackScript');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const scriptContent = \`${fileContent}\`;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'sha256'
    ? getSha256Hash(scriptContent)
    : format === 'html'
      ? \`<script>\${scriptContent}</script>\`
      : <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}`;

  return [types, func].join('\n\n');
};
