import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './sheet-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, 'canvas', true],
    [true, 'surface', true],
    [false, 'canvas', true],
    [false, 'canvas', false],
  ])('should return correct css for open: %s, background: %s and dismissButton: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
