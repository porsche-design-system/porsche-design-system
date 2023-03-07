import { getComponentCss } from './icon-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', 'small', 'light'],
    ['primary', 'small', 'dark'],
    ['state-disabled', 'small', 'light'],
    ['state-disabled', 'small', 'dark'],
    ['contrast-low', 'small', 'light'],
    ['contrast-low', 'small', 'dark'],
    ['contrast-medium', 'small', 'light'],
    ['contrast-medium', 'small', 'light'],
    ['contrast-high', 'small', 'dark'],
    ['contrast-high', 'small', 'dark'],
    ['notification-success', 'small', 'light'],
    ['notification-success', 'small', 'dark'],
    ['notification-warning', 'small', 'light'],
    ['notification-warning', 'small', 'dark'],
    ['notification-error', 'small', 'light'],
    ['notification-error', 'small', 'dark'],
    ['notification-info', 'small', 'light'],
    ['notification-info', 'small', 'dark'],
    ['primary', 'x-small', 'light'],
    ['primary', 'medium', 'light'],
    ['primary', 'large', 'light'],
    ['primary', 'x-large', 'light'],
    ['primary', 'inherit', 'light'],
    ['inherit', 'small', 'light'],
    ['inherit', 'small', 'dark'],
  ])('should return correct css for color: %s, size: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
