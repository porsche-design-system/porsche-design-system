import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './popover-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [true, true, false],
    [true, false, true],
  ])('should return correct css for isOpen: %s, compact: %s and skipEntryTransition: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
