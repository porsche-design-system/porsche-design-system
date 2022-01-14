import { getComponentCss } from './radio-button-wrapper-styles';
import { getSlottedCss } from './radio-button-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'none', true],
    [false, 'none', false],
    [true, 'none', true],
    [true, 'none', false],
    [false, 'success', true],
    [false, 'success', false],
    [true, 'success', true],
    [true, 'success', false],
    [false, 'error', true],
    [false, 'error', false],
    [true, 'error', true],
    [true, 'error', false],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true],
  ])('should return correct css for hideLabel: %o, state: %s and isDisabled: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-radio-button-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-radio-button-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
