import { getComponentCss } from './table-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'auto', 'dark'],
    [false, 'auto', 'light'],
    [true, 'auto', 'dark'],
    [true, 'auto', 'light'],
    [false, 'fixed', 'dark'],
    [false, 'fixed', 'light'],
    [true, 'fixed', 'dark'],
    [true, 'fixed', 'light'],
  ])('should return correct css for compact: %s, layout: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
