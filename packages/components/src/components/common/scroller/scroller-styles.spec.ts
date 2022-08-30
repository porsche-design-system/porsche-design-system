import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', false, false, 'center', 'light'],
    ['surface', false, false, 'center', 'dark'],
    ['default', false, false, 'center', 'light-electric'],
    ['surface', false, false, 'center', 'light'],
    ['default', false, false, 'center', 'dark'],
    ['surface', false, false, 'center', 'light-electric'],
    ['default', false, false, 'top', 'light'],
    ['default', true, false, undefined, 'light'],
    ['default', false, true, undefined, 'dark'],
    ['default', true, true, undefined, 'light'],
  ])(
    'should return correct css for gradientColorScheme: %s, isNextHidden: %s, isPrevHidden: %s and scrollIndicatorPosition: %s, theme: %s ',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
