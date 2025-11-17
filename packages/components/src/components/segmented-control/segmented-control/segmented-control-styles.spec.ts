import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss, MIN_ITEM_WIDTH } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [MIN_ITEM_WIDTH, 20, 'auto', false, false, 'none', 'auto'],
    [MIN_ITEM_WIDTH, 80, 1, false, true, 'none', 'light'],
    [36, 230, 10, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'error', 'dark'],
    [MIN_ITEM_WIDTH, 20, { base: 4, s: 3, m: 2, l: 'auto' }, true, false, 'success', 'light'],
  ])(
    'should return correct css for minWidth: %s, maxWidth: %s, columns: %s, disabled: %s, hideLabel: %o, state: %s and theme',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
