import { getComponentCss } from './stepper-horizontal-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['small'],
    ['medium'],
    [{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }],
  ])('should return correct css for size: %j', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
