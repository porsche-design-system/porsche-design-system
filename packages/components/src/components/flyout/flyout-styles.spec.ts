import { getComponentCss } from './flyout-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'end', true, false, false, 'sticky', 'light'],
    [false, 'end', false, false, false, 'sticky', 'light'],
    [true, 'end', false, false, false, 'sticky', 'dark'],
    [false, 'right', false, false, false, 'sticky', 'light'],
    [false, 'left', false, false, false, 'sticky', 'light'],
    [true, 'end', false, false, false, 'sticky', 'light'],
    [true, 'end', false, true, false, 'sticky', 'dark'],
    [true, 'end', false, false, true, 'sticky', 'auto'],
    [true, 'end', false, false, false, 'sticky', 'auto'],
    [true, 'end', false, true, true, 'sticky', 'light'],
    [true, 'end', true, true, true, 'sticky', 'light'],
    [false, 'end', false, false, true, 'sticky', 'dark'],
    [true, 'end', false, true, false, 'sticky', 'light'],
    [false, 'end', false, true, true, 'sticky', 'dark'],
    [false, 'start', false, false, false, 'sticky', 'light'],
    [true, 'start', false, false, false, 'sticky', 'dark'],
    [true, 'start', false, false, false, 'sticky', 'light'],
    [true, 'start', false, true, false, 'sticky', 'dark'],
    [true, 'start', false, true, true, 'sticky', 'light'],
    [false, 'start', false, false, true, 'sticky', 'dark'],
    [true, 'start', false, true, false, 'sticky', 'light'],
    [false, 'start', false, true, true, 'sticky', 'dark'],
    [true, 'end', true, false, false, 'fixed', 'light'],
    [true, 'end', true, true, false, 'fixed', 'light'],
    [true, 'end', true, true, true, 'fixed', 'light'],
    [true, 'end', true, false, true, 'fixed', 'light'],
    [true, 'end', false, true, true, 'fixed', 'light'],
    [true, 'end', false, false, true, 'fixed', 'light'],
    [true, 'end', false, false, false, 'fixed', 'light'],
    [true, 'end', false, true, false, 'fixed', 'light'],
  ])(
    'should return correct css for isOpen: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s, footerBehavior: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
