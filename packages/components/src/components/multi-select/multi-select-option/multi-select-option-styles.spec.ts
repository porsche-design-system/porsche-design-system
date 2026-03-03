import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './multi-select-option-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])('should return correct css for isDisabled: %s and selected: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
