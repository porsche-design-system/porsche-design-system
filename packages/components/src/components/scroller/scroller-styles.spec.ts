import { getComponentCss } from './scroller-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', false, false, 'center', false, 'light'],
    ['background-surface', false, false, 'center', false, 'dark'],
    ['background-surface', false, false, 'center', false, 'light'],
    ['background-base', false, false, 'center', false, 'dark'],
    ['background-base', false, false, 'top', true, 'light'],
    ['background-base', true, false, undefined, true, 'light'],
    ['background-base', false, true, undefined, true, 'dark'],
    ['background-base', true, true, undefined, true, 'light'],
  ])(
    'should return correct css for gradientColor: %s, isNextHidden: %s, isPrevHidden: %s, scrollIndicatorPosition: %s, hasScrollbar: %s and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
