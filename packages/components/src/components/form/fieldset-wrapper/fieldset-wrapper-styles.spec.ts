import { getComponentCss } from './fieldset-wrapper-styles';
import type { FormState } from '../../../types';
import type { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';

describe('getComponentCss()', () => {
  it.each<[FormState, FieldsetWrapperLabelSize, boolean]>([
    ['none', 'medium', true],
    ['none', 'medium', false],
    ['none', 'small', true],
    ['none', 'small', false],
    ['success', 'medium', false],
    ['error', 'medium', false],
  ])('should return correct css for state: %s, labelSize: %s and hasLabel: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
