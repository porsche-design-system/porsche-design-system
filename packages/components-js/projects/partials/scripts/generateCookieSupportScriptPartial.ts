import * as fs from 'fs';
import * as path from 'path';

export const generateCookieSupportScriptPartial = (): string => {
  const types = `type GetCookieSupportScriptOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetCookieSupportScriptOptionsFormatHtml = GetCookieSupportScriptOptions & { format: 'html' };
type GetCookieSupportScriptOptionsFormatJsx = GetCookieSupportScriptOptions & { format: 'jsx' };`;

  const tmpFilePath = path.resolve('../../../browser-notification', 'dist', 'cookie-support.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8').replace('https://cdn.ui.porsche.com', '${cdnBaseUrl}');

  const func = `export function getCookieSupportScript(opts?: GetCookieSupportScriptOptionsFormatHtml): string;
export function getCookieSupportScript(opts?: GetCookieSupportScriptOptionsFormatJsx): JSX.Element;
export function getCookieSupportScript(opts?: GetCookieSupportScriptOptions): string | JSX.Element {
  const { cdn, format }: GetCookieSupportScriptOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getCookieSupportScript');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const scriptContent = \`${fileContent}\`;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'html' ? \`<script>\${scriptContent}</script>\` : <script dangerouslySetInnerHTML={{__html: scriptContent}} />;
}`;

  return [types, func].join('\n\n');
};
