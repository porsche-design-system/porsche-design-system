import { getLoader } from '../../../src/font-loader';

describe('getLoader', () => {
  it('should be minified', () => {
    const result = getLoader();
    expect(result).not.toContain('\n');
  });
});
