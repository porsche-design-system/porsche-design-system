import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './canvas-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'canvas'],
    [true, false, 'canvas'],
    [false, true, 'canvas'],
    [true, true, 'canvas'],
    [false, false, 'surface'],
    [true, true, 'surface'],
  ])('should return correct css for: %o', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
