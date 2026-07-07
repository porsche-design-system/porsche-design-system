import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './popover-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])('should return correct css for isOpen: %s and compact: %s', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
