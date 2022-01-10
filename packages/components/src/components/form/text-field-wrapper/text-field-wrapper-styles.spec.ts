import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { BreakpointCustomizable } from '../../../utils';
import { FormState } from '../../../types';
import { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState, boolean, TextFieldWrapperUnitPosition, boolean]>([
    [false, 'none', false, 'prefix', false],
    [false, 'none', true, 'prefix', false],
    [false, 'none', true, 'suffix', false],
    [false, 'success', false, 'prefix', false],
    [false, 'success', true, 'prefix', false],
    [false, 'success', true, 'suffix', false],
    [false, 'error', false, 'prefix', false],
    [false, 'error', true, 'prefix', false],
    [false, 'error', true, 'suffix', false],
    [true, 'none', false, 'prefix', false],
    [true, 'none', true, 'prefix', false],
    [true, 'none', true, 'prefix', false],
    [true, 'success', false, 'prefix', false],
    [true, 'success', true, 'prefix', false],
    [true, 'success', true, 'prefix', false],
    [true, 'error', false, 'prefix', false],
    [true, 'error', true, 'prefix', false],
    [true, 'error', true, 'prefix', false],
    [false, 'none', false, 'prefix', true],
    [false, 'success', false, 'prefix', true],
    [false, 'error', false, 'prefix', true],
    [true, 'none', false, 'prefix', true],
    [true, 'success', false, 'prefix', true],
    [true, 'error', false, 'prefix', true],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', false, 'prefix', false],
  ])(
    'should return correct css for hideLabel: %o, state: %s, hasUnitOrCounter: %s, unitPosition: %s and isPassword: %s',
    (hideLabel, state, hasUnitOrCounter, unitPosition, isPassword) => {
      expect(getComponentCss(hideLabel, state, hasUnitOrCounter, unitPosition, isPassword)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text-field-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text-field-wrapper');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
