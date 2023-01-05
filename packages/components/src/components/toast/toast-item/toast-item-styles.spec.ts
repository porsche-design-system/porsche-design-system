import { getComponentCss } from './toast-item-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['success', 'light'],
    ['neutral', 'light'],
    ['success', 'dark'],
    ['neutral', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
