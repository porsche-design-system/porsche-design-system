import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss, MIN_ITEM_WIDTH } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [MIN_ITEM_WIDTH, 20, 'auto', false, false, 'none', 'auto', false],
    [MIN_ITEM_WIDTH, 80, 1, false, true, 'none', 'light', false],
    [36, 230, 10, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'error', 'dark', false],
    [MIN_ITEM_WIDTH, 20, { base: 4, s: 3, m: 2, l: 'auto' }, true, false, 'success', 'light', false],
    [undefined, undefined, 1, false, false, 'none', 'light', true],
    [undefined, undefined, 'auto', true, false, 'error', 'dark', true],
  ])(
    'should return correct css for minWidth: %s, maxWidth: %s, columns: %s, disabled: %s, hideLabel: %o, state: %s, theme: %s and noWrap: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
