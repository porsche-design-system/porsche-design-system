import { getComponentCss } from './scroller-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', 'light', undefined],
    ['surface', 'dark', undefined],
    ['default', 'light-electric', undefined],
    ['surface', 'light', undefined],
    ['default', 'dark', undefined],
    ['surface', 'light-electric', undefined],
    [
      'default',
      'light',
      {
        top: 'calc(50% - .5em)',
        transform: 'translate3d(0,calc(-50% + .375em),0)',
      },
    ],
  ])('should return correct css for gradientColorScheme: %s, theme: %s and prevNextButtonJssStyle: %o ', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
