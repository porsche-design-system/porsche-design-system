import { getSlottedCss } from './text-list-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text-list');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text-list');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
