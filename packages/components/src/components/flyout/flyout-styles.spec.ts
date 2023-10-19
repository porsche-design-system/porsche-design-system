import { getComponentCss } from './flyout-styles';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'end', false, false, 'light'],
    [true, 'end', false, false, 'dark'],
    [false, 'right', false, false, 'light'],
    [false, 'left', false, false, 'light'],
    [true, 'end', false, false, 'light'],
    [true, 'end', true, false, 'dark'],
    [true, 'end', false, true, 'auto'],
    [true, 'end', false, false, 'auto'],
    [true, 'end', true, true, 'light'],
    [false, 'end', false, true, 'dark'],
    [true, 'end', true, false, 'light'],
    [false, 'end', true, true, 'dark'],
    [false, 'start', false, false, 'light'],
    [true, 'start', false, false, 'dark'],
    [true, 'start', false, false, 'light'],
    [true, 'start', true, false, 'dark'],
    [true, 'start', true, true, 'light'],
    [false, 'start', false, true, 'dark'],
    [true, 'start', true, false, 'light'],
    [false, 'start', true, true, 'dark'],
  ])(
    'should return correct css for isOpen: %s, position: %s, hasFooter: %s, hasSubFooter: %s, theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
