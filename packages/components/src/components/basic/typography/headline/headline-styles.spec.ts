import { getSlottedCss } from './headline-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
