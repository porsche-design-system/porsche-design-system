import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './action-sheet-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, 'light'],
    [true, true, 'dark'],
    [true, true, 'auto'],
    [false, true, 'light'],
    [false, false, 'light'],
  ])('should return correct css for open: %s, dismissButton: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
