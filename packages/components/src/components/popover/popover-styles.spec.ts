import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './popover-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])('should return correct css for compact: %s and isOpen: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
