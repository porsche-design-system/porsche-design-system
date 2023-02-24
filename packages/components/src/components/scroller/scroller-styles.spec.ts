import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', false, false, 'center', false, 'light'],
    ['surface', false, false, 'center', false, 'dark'],
    ['surface', false, false, 'center', false, 'light'],
    ['default', false, false, 'center', false, 'dark'],
    ['default', false, false, 'top', true, 'light'],
    ['default', true, false, undefined, true, 'light'],
    ['default', false, true, undefined, true, 'dark'],
    ['default', true, true, undefined, true, 'light'],
  ])(
    'should return correct css for gradientColorScheme: %s, isNextHidden: %s, isPrevHidden: %s, scrollIndicatorPosition: %s, scrollbar: %s and theme: %s ',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
