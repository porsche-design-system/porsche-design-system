import * as fs from 'fs';
import * as path from 'path';
import { getDSRPonyfill } from '../../../src';
import { renderToString } from 'react-dom/server';

const filePath = path.resolve(__dirname, '../../../dist-tmp/dsr-ponyfill.min.js');
const fileContent = fs.readFileSync(filePath, 'utf8').trim();

describe('format: html', () => {
  it('should return content of dsr-ponyfill tmp build within script tag', () => {
    const result = getDSRPonyfill();
    expect(result).toBe(`<script>${fileContent}</script>`);
  });
});

describe('format: jsx', () => {
  it('should return content of dsr-ponyfill tmp build within script tag', () => {
    const result = getDSRPonyfill({ format: 'jsx' });
    expect(renderToString(result)).toBe(`<script>${fileContent}</script>`);
  });
});

describe('format: sha256', () => {
  it('should return hash for content of dsr-ponyfill tmp build', () => {
    const result = getDSRPonyfill({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"sha256-ZtG/+dXiFXgoQphKFMfxxE3a1kTlVghzRWSAr790e1Y="`);
  });
});
