import { getDSRPonyfill } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { render } from '@testing-library/react';

const filePath = path.resolve(__dirname, '../../../dist-tmp/dsr-ponyfill.min.js');
const fileContent = fs.readFileSync(filePath, 'utf8').trim();

jest.mock('../../../src/shared');

describe('format: html', () => {
  it('should return content of dsr-ponyfill tmp build within script tag', () => {
    const result: string = getDSRPonyfill();
    expect(result).toBe(`<script>${fileContent}</script>`);
  });
});

describe('format: jsx', () => {
  it('should return content of dsr-ponyfill tmp build within script tag', () => {
    const result: JSX.Element = getDSRPonyfill({ format: 'jsx' });
    const { container } = render(result);
    expect(container.innerHTML).toBe(`<script>${fileContent}</script>`);
  });
});
