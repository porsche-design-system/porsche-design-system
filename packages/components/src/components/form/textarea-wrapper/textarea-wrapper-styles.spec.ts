import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';
import { BreakpointCustomizable } from '../../../utils';
import { FormState } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState]>([
    [false, 'none'],
    [true, 'none'],
    [false, 'success'],
    [true, 'success'],
    [false, 'error'],
    [true, 'error'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none'],
  ])('should return correct css for hideLabel: %o and state: %s', (hideLabel, state) => {
    expect(getComponentCss(hideLabel, state)).toMatchSnapshot();
  });
});

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
