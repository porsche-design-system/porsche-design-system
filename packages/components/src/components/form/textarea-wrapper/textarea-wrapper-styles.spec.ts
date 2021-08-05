import { getSlottedCss } from './textarea-wrapper-styles';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-textarea-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-textarea-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
