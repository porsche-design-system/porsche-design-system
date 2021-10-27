import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { BreakpointCustomizable } from '../../../utils';
import { FormState } from '../../../types';
import { UnitPositionType } from './text-field-wrapper-utils';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState, string, UnitPositionType, boolean]>([
    [false, 'none', '', 'prefix', false],
    [false, 'none', 'km/h', 'prefix', false],
    [false, 'none', 'kg/m3', 'suffix', false],
    [false, 'success', '', 'prefix', false],
    [false, 'success', 'km/h', 'prefix', false],
    [false, 'success', 'kg/m3', 'suffix', false],
    [false, 'error', '', 'prefix', false],
    [false, 'error', 'km/h', 'prefix', false],
    [false, 'error', 'kg/m3', 'suffix', false],
    [true, 'none', '', 'prefix', false],
    [true, 'none', 'km/h', 'prefix', false],
    [true, 'none', 'kg/m3', 'prefix', false],
    [true, 'success', '', 'prefix', false],
    [true, 'success', 'km/h', 'prefix', false],
    [true, 'success', 'kg/m3', 'prefix', false],
    [true, 'error', '', 'prefix', false],
    [true, 'error', 'km/h', 'prefix', false],
    [true, 'error', 'kg/m3', 'prefix', false],
    [false, 'none', '', 'prefix', true],
    [false, 'success', '', 'prefix', true],
    [false, 'error', '', 'prefix', true],
    [true, 'none', '', 'prefix', true],
    [true, 'success', '', 'prefix', true],
    [true, 'error', '', 'prefix', true],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', '', 'prefix', false],
  ])(
    'should return correct css for hideLabel: %o, state: %s, unit: %s and unitPosition: %s',
    (hideLabel, state, unit, unitPosition, isPassword) => {
      expect(getComponentCss(hideLabel, state, unit, unitPosition, isPassword)).toMatchSnapshot();
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
