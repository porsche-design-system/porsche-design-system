import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './modal-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'canvas', 'blur', false, true, false, false],
    [false, 'canvas', 'shading', false, true, false, false],
    [false, 'canvas', 'blur', true, true, false, false],
    [false, 'canvas', 'shading', true, true, false, false],
    [false, 'canvas', 'blur', true, true, false, false],
    [false, 'canvas', 'shading', true, true, false, false],
    [false, 'surface', 'blur', true, false, false, false],
    [false, 'surface', 'blur', true, false, true, false],
    [false, 'surface', 'blur', false, false, true, false],
    [false, 'surface', 'blur', false, true, true, false],
    [false, 'surface', 'blur', true, true, true, false],
    [true, 'canvas', 'blur', false, true, false, false],
    [true, 'canvas', 'blur', true, true, false, false],
    [true, 'canvas', 'blur', true, false, false, false],
    [true, 'canvas', 'blur', true, false, true, false],
    [true, 'canvas', 'blur', false, false, true, false],
    [true, 'surface', 'blur', false, true, true, false],
    [true, 'surface', 'blur', true, true, true, false],
    [true, 'surface', 'blur', { base: true, xs: false, s: true, m: false, l: true, xl: false }, true, false, false],
    [true, 'surface', 'blur', false, false, true, true],
    [true, 'surface', 'blur', false, false, false, true],
  ])(
    'should return correct css for open: %s, backdrop: %s, fullscreen: %o, dismissButton: %s, hasHeader: %s and hasFooter: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
