import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './tag-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', false, true, true],
    ['secondary', false, false, true],
    ['info', true, false, true],
    ['warning', true, false, false],
    ['error', false, true, true],
  ])('should return correct css for variant: %s, compact: %s, isFocusable: %s and hasIcon: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
