import { getComponentCss } from './fieldset-wrapper-styles';
import { BreakpointCustomizable, ButtonVariant, FormState, Theme } from '../../../types';
import { FieldsetWrapperLabelSize } from './fieldset-wrapper-utils';

describe('getComponentCss()', () => {
  it.each<[FormState, boolean, FieldsetWrapperLabelSize, boolean, boolean]>([
    ['none', false, 'medium', false, false],
    ['none', true, 'small', false, false],
    ['none', false, 'medium', true, false],
    ['none', false, 'medium', false, true],
    ['success', false, 'medium', false, false],
    ['error', false, 'medium', false, false],
  ])(
    'should return correct css for state: %s, required: %s, labelSize: %s, hasLabel: %s and hasMessage: %s',
    (state, required, labelSize, hasLabel, hasMessage) => {
      expect(getComponentCss(state, required, labelSize, hasLabel, hasMessage)).toMatchSnapshot();
    }
  );
});
