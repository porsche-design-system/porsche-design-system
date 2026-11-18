import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './sheet-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'canvas', true],
    [true, 'surface', true],
    [false, 'canvas', true],
    [false, 'canvas', false],
    [true, 'canvas', true, true],
    [true, 'canvas', false, true],
  ])('should return correct css for open: %s, background: %s, dismissButton: %s and swipeHandle: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
