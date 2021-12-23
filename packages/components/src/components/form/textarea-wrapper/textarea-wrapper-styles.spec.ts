import { getComponentCss, getSlottedCss } from './textarea-wrapper-styles';
import { BreakpointCustomizable } from '../../../utils';
import { FormState } from '../../../types';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState, boolean]>([
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
  ])('should return correct css for hideLabel: %o, state: %s and %s', (hideLabel, state, hasCounter) => {
    expect(getComponentCss(hideLabel, state, hasCounter)).toMatchSnapshot();
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
