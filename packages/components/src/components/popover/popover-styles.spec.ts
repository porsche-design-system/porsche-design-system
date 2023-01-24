import { getComponentCss } from './popover-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['top', 'light'],
    ['right', 'light'],
    ['bottom', 'light'],
    ['left', 'light'],
    ['top', 'dark'],
    ['right', 'dark'],
    ['bottom', 'dark'],
    ['left', 'dark'],
  ])('should return correct css for direction: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
