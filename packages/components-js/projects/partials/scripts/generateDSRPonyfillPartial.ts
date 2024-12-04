import * as fs from 'fs';
import * as path from 'path';

export const generateDSRPonyfillPartial = (): string => {
  const types = `type GetDSRPonyfillOptions = {
  format?: FormatWithCSP;
};`;

  const filePath = path.resolve(__dirname, '../dist-tmp/dsr-ponyfill.min.js');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const func = `export function getDSRPonyfill(opts: GetDSRPonyfillOptions & { format: 'jsx' }): JSX.Element;
export function getDSRPonyfill(opts?: GetDSRPonyfillOptions): string;
export function getDSRPonyfill(opts?: GetDSRPonyfillOptions): string | JSX.Element {
  const { format }: GetDSRPonyfillOptions = {
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getDSRPonyfill');

  const scriptContent = \`${fileContent.trim()}\`;

  if (format === 'sha256') {
    return getSha256Hash(scriptContent);
  } else if (format === 'html') {
    return \`<script>\${scriptContent}</script>\`;
  } else {
    const jsxRuntime = require('react/jsx-runtime');
    return jsxRuntime.jsx("script", { dangerouslySetInnerHTML: { __html: scriptContent } });
  }
}`;

  return [types, func].join('\n\n');
};
