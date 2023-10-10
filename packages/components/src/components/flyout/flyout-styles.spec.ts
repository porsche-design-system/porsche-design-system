import { getComponentCss } from './flyout-styles';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'right', false, false, false, 'light'],
    [true, 'right', false, false, false, 'dark'],
    [true, 'right', true, false, false, 'light'],
    [true, 'right', true, true, false, 'dark'],
    [true, 'right', true, false, true, 'auto'],
    [true, 'right', true, false, false, 'auto'],
    [true, 'right', true, true, true, 'light'],
    [false, 'right', true, false, true, 'dark'],
    [true, 'right', false, true, false, 'light'],
    [false, 'right', true, true, true, 'dark'],
    [false, 'left', false, false, false, 'light'],
    [true, 'left', false, false, false, 'dark'],
    [true, 'left', true, false, false, 'light'],
    [true, 'left', true, true, false, 'dark'],
    [true, 'left', true, true, true, 'light'],
    [false, 'left', true, false, true, 'dark'],
    [true, 'left', false, true, false, 'light'],
    [false, 'left', true, true, true, 'dark'],
  ])(
    'should return correct css for isOpen: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
