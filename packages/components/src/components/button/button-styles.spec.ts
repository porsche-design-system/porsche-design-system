import { getComponentCss } from './button-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, false, 'light'],
    ['arrow-right', '', 'primary', false, false, 'dark'],
    ['arrow-right', '', 'secondary', false, false, 'light'],
    ['arrow-right', '', 'secondary', false, false, 'dark'],
    ['arrow-right', '', 'tertiary', false, false, 'light'],
    ['arrow-right', '', 'tertiary', false, false, 'dark'],
    ['arrow-right', '', 'primary', false, true, 'light'],
    ['arrow-right', '', 'primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, 'dark'],
  ])('should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, isDisabledOrLoading: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
