import { getComponentCss } from './button-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['arrow-right', '', 'primary', false, false, false, false, 'light'],
    ['arrow-right', '', 'primary', false, false, false, false, 'dark'],
    ['arrow-right', '', 'secondary', false, false, false, false, 'light'],
    ['arrow-right', '', 'secondary', false, false, false, false, 'dark'],
    ['arrow-right', '', 'tertiary', false, false, false, false, 'light'],
    ['arrow-right', '', 'tertiary', false, false, false, false, 'dark'],
    ['arrow-right', '', 'primary', false, true, false, false, 'light'],
    ['arrow-right', '', 'primary', false, false, true, false, 'light'],
    ['arrow-right', '', 'primary', false, false, false, true, 'light'],
    ['arrow-right', '', 'primary', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true,false, false, 'dark'],
  ])('should return correct css for icon: %s, iconSource: %s, variant: %s, hideLabel: %s, disabled: %s, isDisabledOrLoading: %s, loading: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
