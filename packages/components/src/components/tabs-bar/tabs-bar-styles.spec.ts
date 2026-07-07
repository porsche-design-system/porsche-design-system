import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './tabs-bar-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['none', 'small', false, undefined],
    ['none', 'small', false, 0],
    ['none', 'small', false, 2],
    ['canvas', 'small', false, 0],
    ['surface', 'small', false, 0],
    ['frosted', 'small', false, 0],
    ['frosted', 'medium', false, 0],
    ['frosted', 'medium', true, 0],
    ['none', { base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }, false, 0],
  ])(
    'should return correct css for background: %s, size: %j, isCompact: %s, activeTabIndex: %s',
    async (...args) => {
      await validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
