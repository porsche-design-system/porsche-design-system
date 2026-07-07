import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss, MIN_ITEM_WIDTH } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [MIN_ITEM_WIDTH, 20, 'auto', false, false, 'none', false],
    [MIN_ITEM_WIDTH, 80, 1, false, true, 'none', false],
    [36, 230, 10, false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'error', false],
    [MIN_ITEM_WIDTH, 20, { base: 4, s: 3, m: 2, l: 'auto' }, true, false, 'success', false],
    [undefined, undefined, 1, false, false, 'none', true],
    [undefined, undefined, 'auto', true, false, 'error', true],
  ])(
    'should return correct css for minWidth: %s, maxWidth: %s, columns: %s, disabled: %s, hideLabel: %o, state: %s and noWrap: %s',
    async (...args) => {
      await validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
