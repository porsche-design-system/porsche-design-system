import { getComponentCss } from './toast-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['neutral', 'light'],
    ['success', 'light'],
    ['info', 'light'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['info', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
