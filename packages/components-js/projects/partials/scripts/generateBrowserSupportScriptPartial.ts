import * as fs from 'fs';
import * as path from 'path';

export const generateBrowserSupportScriptPartial = (): string => {
  const types = `type GetBrowserSupportScriptOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetBrowserSupportScriptOptionsFormatHtml = GetBrowserSupportScriptOptions & { format: 'html' };
type GetBrowserSupportScriptOptionsFormatJsx = GetBrowserSupportScriptOptions & { format: 'jsx' };`;

  const tmpFilePath = path.resolve('../../../browser-notification', 'dist', 'browser-support.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8').replace('https://cdn.ui.porsche.com', '${cdnBaseUrl}');

  const func = `export function getBrowserSupportScript(opts?: GetBrowserSupportScriptOptionsFormatHtml): string;
export function getBrowserSupportScript(opts?: GetBrowserSupportScriptOptionsFormatJsx): JSX.Element;
export function getBrowserSupportScript(opts?: GetBrowserSupportScriptOptions): string | JSX.Element {
  const { cdn, format }: GetBrowserSupportScriptOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getBrowserSupportScript');

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const scriptContent = \`${fileContent}\`;

  // there is no other solution than using dangerouslySetInnerHTML since JSX elements are rendered by the createElement() function
  // https://stackoverflow.com/a/64815699
  return format === 'html' ? \`<script>\${scriptContent}</script>\` : <script dangerouslySetInnerHTML={{__html: scriptContent}} />;
}`;

  return [types, func].join('\n\n');
};
