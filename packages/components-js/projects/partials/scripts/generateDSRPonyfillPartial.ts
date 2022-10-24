import * as fs from 'fs';
import * as path from 'path';

export const generateDSRPonyfillPartial = (): string => {
  const types = `type GetDSRPonyfillOptions = {
  format?: Format;
};`;

  const ponyfillFilePath = path.resolve(__dirname, '../dist/dsr-ponyfill.min.js');
  const fileContent = fs.readFileSync(ponyfillFilePath, 'utf8');

  const func = `export function getDSRPonyfill(opts?: GetDSRPonyfillOptions & { format: 'html' }): string;
export function getDSRPonyfill(opts?: GetDSRPonyfillOptions & { format: 'jsx' }): JSX.Element;
export function getDSRPonyfill(opts?: GetDSRPonyfillOptions): string | JSX.Element {
  const { format }: GetDSRPonyfillOptions = {
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getDSRPonyfill');

  const scriptContent = \`${fileContent}\`;

  const markup = format === 'html' ? \`<script>\${scriptContent}</script>\` : <script dangerouslySetInnerHTML={{__html: scriptContent}} />;

  return markup;
}`;

  return [types, func].join('\n\n');
};
