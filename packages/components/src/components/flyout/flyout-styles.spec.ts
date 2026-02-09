import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './flyout-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'canvas', 'blur', 'end', true, false, false, 'sticky'],
    [false, 'canvas', 'shading', 'end', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'end', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'end', false, false, false, 'sticky'],
    [true, 'canvas', 'shading', 'end', false, true, false, 'sticky'],
    [true, 'canvas', 'blur', 'end', false, false, true, 'sticky'],
    [true, 'canvas', 'shading', 'end', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'end', false, true, true, 'sticky'],
    [true, 'canvas', 'blur', 'end', true, true, true, 'sticky'],
    [false, 'canvas', 'blur', 'end', false, false, true, 'sticky'],
    [true, 'canvas', 'blur', 'end', false, true, false, 'sticky'],
    [false, 'canvas', 'blur', 'end', false, true, true, 'sticky'],
    [false, 'canvas', 'blur', 'start', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'start', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'start', false, false, false, 'sticky'],
    [true, 'canvas', 'blur', 'start', false, true, false, 'sticky'],
    [true, 'canvas', 'blur', 'start', false, true, true, 'sticky'],
    [false, 'canvas', 'blur', 'start', false, false, true, 'sticky'],
    [true, 'canvas', 'blur', 'start', false, true, false, 'sticky'],
    [false, 'canvas', 'blur', 'start', false, true, true, 'sticky'],
    [true, 'surface', 'blur', 'end', true, false, false, 'fixed'],
    [true, 'surface', 'blur', 'end', true, true, false, 'fixed'],
    [true, 'surface', 'blur', 'end', true, true, true, 'fixed'],
    [true, 'surface', 'blur', 'end', true, false, true, 'fixed'],
    [true, 'surface', 'blur', 'end', false, true, true, 'fixed'],
    [true, 'surface', 'blur', 'end', false, false, true, 'fixed'],
    [true, 'surface', 'blur', 'end', false, false, false, 'fixed'],
    [true, 'surface', 'blur', 'end', false, true, false, 'fixed'],
  ])(
    'should return correct css for isOpen: %s, backdrop: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s and footerBehavior: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
