import { getComponentCss } from './table-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'auto'],
    [false, 'auto',],
    [true, 'auto'],
    [true, 'auto',],
    [false, 'fixed'],
    [false, 'fixed',],
    [true, 'fixed'],
    [true, 'fixed',],
  ])('should return correct css for compact: %s and layout: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
