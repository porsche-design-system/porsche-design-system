import { getLoader } from '../../../src';
import * as fs from 'fs';

describe('getLoader()', () => {
  const filePath = require.resolve('@porsche-design-system/components-js');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  it('should return content of components-js build within script tag', () => {
    const result = getLoader();
    expect(result).toMatch(`<script>${fileContent}</script>`);
  });

  it('should return content of components-js build without script tag', () => {
    const result = getLoader({ withoutTags: true });
    expect(result).toMatch(fileContent);
  });
});
