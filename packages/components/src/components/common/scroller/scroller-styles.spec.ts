import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', 'light', false, false, undefined],
    ['surface', 'dark', false, false, undefined],
    ['default', 'light-electric', false, false, undefined],
    ['surface', 'light', false, false, undefined],
    ['default', 'dark', false, false, undefined],
    ['surface', 'light-electric', false, false, undefined],
    [
      'default',
      'light',
      false,
      false,
      {
        top: 'calc(50% - .5em)',
        transform: 'translate3d(0,calc(-50% + .375em),0)',
      },
    ],
    ['default', 'light', true, false, undefined],
    ['default', 'dark', false, true, undefined],
    ['default', 'light', true, true, undefined],
  ])(
    'should return correct css for gradientColorScheme: %s, theme: %s, isPrevHidden: %s, isNextHidden: %s and prevNextButtonJssStyle: %o ',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
