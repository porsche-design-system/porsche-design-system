import { getComponentCss, getSlottedCss } from './text-field-wrapper-styles';
import { BreakpointCustomizable } from '../../../utils';
import { FormState } from '../../../types';
import { UnitPositionType } from './text-field-wrapper-utils';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<boolean>, FormState, string, UnitPositionType]>([
    [false, 'none', '', 'prefix'],
    [false, 'none', 'km/h', 'prefix'],
    [false, 'none', 'kg/m3', 'suffix'],
    [false, 'success', '', 'prefix'],
    [false, 'success', 'km/h', 'prefix'],
    [false, 'success', 'kg/m3', 'suffix'],
    [false, 'error', '', 'prefix'],
    [false, 'error', 'km/h', 'prefix'],
    [false, 'error', 'kg/m3', 'suffix'],
    [true, 'none', '', 'prefix'],
    [true, 'none', 'km/h', 'prefix'],
    [true, 'none', 'kg/m3', 'prefix'],
    [true, 'success', '', 'prefix'],
    [true, 'success', 'km/h', 'prefix'],
    [true, 'success', 'kg/m3', 'prefix'],
    [true, 'error', '', 'prefix'],
    [true, 'error', 'km/h', 'prefix'],
    [true, 'error', 'kg/m3', 'prefix'],
    [{ base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', '', 'prefix'],
  ])(
    'should return correct css for hideLabel: %o, state: %s, unit: %s and unitPosition: %s',
    (hideLabel, state, unit, unitPosition) => {
      expect(getComponentCss(hideLabel, state, unit, unitPosition)).toMatchSnapshot();
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
