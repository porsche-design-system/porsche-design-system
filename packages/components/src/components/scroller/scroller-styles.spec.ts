import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', false, false, 'center', 'light'],
    ['background-surface', false, false, 'center', 'dark'],
    ['background-surface', false, false, 'center', 'light'],
    ['background-base', false, false, 'center', 'dark'],
    ['background-base', false, false, 'top', 'light'],
    ['background-base', true, false, undefined, 'light'],
    ['background-base', false, true, undefined, 'dark'],
    ['background-base', true, true, undefined, 'light'],
  ])(
    'should return correct css for gradientColor: %s, isNextHidden: %s, isPrevHidden: %s, scrollIndicatorPosition: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
