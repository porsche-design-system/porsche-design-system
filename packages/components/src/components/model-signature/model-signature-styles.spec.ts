import { getComponentCss } from './model-signature-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['718', 'small', 'primary', 'light'],
    ['718', 'small', 'contrast-low', 'light'],
    ['718', 'small', 'contrast-medium', 'light'],
    ['718', 'small', 'contrast-high', 'light'],
    ['718', 'small', 'inherit', 'light'],
    ['718', 'medium', 'primary', 'light'],
    ['718', 'inherit', 'primary', 'light'],
    ['718', 'inherit', 'inherit', 'light'],
    ['718', 'small', 'primary', 'dark'],
    ['718', 'small', 'contrast-low', 'dark'],
    ['718', 'small', 'contrast-medium', 'dark'],
    ['718', 'small', 'contrast-high', 'dark'],
    ['718', 'small', 'inherit', 'dark'],
    ['718', 'medium', 'primary', 'dark'],
    ['718', 'inherit', 'primary', 'dark'],
    ['718', 'inherit', 'inherit', 'dark'],
  ])('should return correct css for model: %s, size: %s, color: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
