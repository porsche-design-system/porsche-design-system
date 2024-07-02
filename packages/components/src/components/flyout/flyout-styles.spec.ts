import { getComponentCss } from './flyout-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'end', true, false, false, 'light'],
    [false, 'end', false, false, false, 'light'],
    [true, 'end', false, false, false, 'dark'],
    [false, 'right', false, false, false, 'light'],
    [false, 'left', false, false, false, 'light'],
    [true, 'end', false, false, false, 'light'],
    [true, 'end', false, true, false, 'dark'],
    [true, 'end', false, false, true, 'auto'],
    [true, 'end', false, false, false, 'auto'],
    [true, 'end', false, true, true, 'light'],
    [true, 'end', true, true, true, 'light'],
    [false, 'end', false, false, true, 'dark'],
    [true, 'end', false, true, false, 'light'],
    [false, 'end', false, true, true, 'dark'],
    [false, 'start', false, false, false, 'light'],
    [true, 'start', false, false, false, 'dark'],
    [true, 'start', false, false, false, 'light'],
    [true, 'start', false, true, false, 'dark'],
    [true, 'start', false, true, true, 'light'],
    [false, 'start', false, false, true, 'dark'],
    [true, 'start', false, true, false, 'light'],
    [false, 'start', false, true, true, 'dark'],
  ])(
    'should return correct css for isOpen: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
