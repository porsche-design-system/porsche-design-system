import { getComponentCss } from './toast-item-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['success', 'light'],
    ['info', 'light'],
    ['success', 'dark'],
    ['info', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
