import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', 'light', false, false, 'center'],
    ['surface', 'dark', false, false, 'center'],
    ['default', 'light-electric', false, false, 'center'],
    ['surface', 'light', false, false, 'center'],
    ['default', 'dark', false, false, 'center'],
    ['surface', 'light-electric', false, false, 'center'],
    ['default', 'light', false, false, 'top'],
    ['default', 'light', true, false, undefined],
    ['default', 'dark', false, true, undefined],
    ['default', 'light', true, true, undefined],
  ])(
    'should return correct css for gradientColorScheme: %s, theme: %s, isPrevHidden: %s, isNextHidden: %s and scrollIndicatorPosition: %s ',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
