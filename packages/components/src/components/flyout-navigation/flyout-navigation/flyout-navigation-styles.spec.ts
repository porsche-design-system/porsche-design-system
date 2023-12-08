import { getComponentCss } from './flyout-navigation-styles';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'light'],
    [true, false, 'light'],
    [true, true, 'light'],
    [false, false, 'dark'],
    [true, false, 'dark'],
    [true, true, 'dark'],
    [false, false, 'auto'],
    [true, false, 'auto'],
    [true, true, 'auto'],
  ])(
    'should return correct css for isPrimaryScrollerVisible: %s, isSecondaryScrollerVisible: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
