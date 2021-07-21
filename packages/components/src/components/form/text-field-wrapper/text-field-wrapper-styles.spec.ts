import { getSlottedTextFieldWrapperCss } from './text-field-wrapper-styles';

describe('getSlottedTextFieldWrapperCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-accordion');
    expect(getSlottedTextFieldWrapperCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-accordion');
    expect(getSlottedTextFieldWrapperCss(host)).toMatchSnapshot();
  });
});
