import { getComponentCss } from './multi-select-option-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['light', false, false],
    ['dark', false, false],
    ['light', true, false],
    ['dark', true, false],
    ['light', false, true],
    ['dark', false, true],
    ['light', true, true],
    ['dark', true, true],
  ])('should return correct css for theme: %s, isDisabled: %s and selected: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
