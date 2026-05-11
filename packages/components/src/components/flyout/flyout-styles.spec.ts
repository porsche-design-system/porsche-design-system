import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './flyout-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'blur', 'end', true, false, false, 'sticky', 'light'],
    [false, 'shading', 'end', false, false, false, 'sticky', 'light'],
    [true, 'blur', 'end', false, false, false, 'sticky', 'dark'],
    [false, 'blur', 'right', false, false, false, 'sticky', 'light'],
    [false, 'blur', 'left', false, false, false, 'sticky', 'light'],
    [true, 'blur', 'end', false, false, false, 'sticky', 'light'],
    [true, 'shading', 'end', false, true, false, 'sticky', 'dark'],
    [true, 'blur', 'end', false, false, true, 'sticky', 'auto'],
    [true, 'shading', 'end', false, false, false, 'sticky', 'auto'],
    [true, 'blur', 'end', false, true, true, 'sticky', 'light'],
    [true, 'blur', 'end', true, true, true, 'sticky', 'light'],
    [false, 'blur', 'end', false, false, true, 'sticky', 'dark'],
    [true, 'blur', 'end', false, true, false, 'sticky', 'light'],
    [false, 'blur', 'end', false, true, true, 'sticky', 'dark'],
    [false, 'blur', 'start', false, false, false, 'sticky', 'light'],
    [true, 'blur', 'start', false, false, false, 'sticky', 'dark'],
    [true, 'blur', 'start', false, false, false, 'sticky', 'light'],
    [true, 'blur', 'start', false, true, false, 'sticky', 'dark'],
    [true, 'blur', 'start', false, true, true, 'sticky', 'light'],
    [false, 'blur', 'start', false, false, true, 'sticky', 'dark'],
    [true, 'blur', 'start', false, true, false, 'sticky', 'light'],
    [false, 'blur', 'start', false, true, true, 'sticky', 'dark'],
    [true, 'blur', 'end', true, false, false, 'fixed', 'light'],
    [true, 'blur', 'end', true, true, false, 'fixed', 'light'],
    [true, 'blur', 'end', true, true, true, 'fixed', 'light'],
    [true, 'blur', 'end', true, false, true, 'fixed', 'light'],
    [true, 'blur', 'end', false, true, true, 'fixed', 'light'],
    [true, 'blur', 'end', false, false, true, 'fixed', 'light'],
    [true, 'blur', 'end', false, false, false, 'fixed', 'light'],
    [true, 'blur', 'end', false, true, false, 'fixed', 'light'],
  ])(
    'should return correct css for isOpen: %s, backdrop: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s, footerBehavior: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
