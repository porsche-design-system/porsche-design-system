import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './flyout-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, 'canvas', 'blur', 'end', true, false, false, 'sticky', false],
    [false, 'canvas', 'shading', 'end', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'end', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'end', false, false, false, 'sticky', false],
    [true, 'canvas', 'shading', 'end', false, true, false, 'sticky', false],
    [true, 'canvas', 'blur', 'end', false, false, true, 'sticky', false],
    [true, 'canvas', 'shading', 'end', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'end', false, true, true, 'sticky', false],
    [true, 'canvas', 'blur', 'end', true, true, true, 'sticky', false],
    [false, 'canvas', 'blur', 'end', false, false, true, 'sticky', false],
    [true, 'canvas', 'blur', 'end', false, true, false, 'sticky', false],
    [false, 'canvas', 'blur', 'end', false, true, true, 'sticky', false],
    [false, 'canvas', 'blur', 'start', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'start', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'start', false, false, false, 'sticky', false],
    [true, 'canvas', 'blur', 'start', false, true, false, 'sticky', false],
    [true, 'canvas', 'blur', 'start', false, true, true, 'sticky', false],
    [false, 'canvas', 'blur', 'start', false, false, true, 'sticky', false],
    [true, 'canvas', 'blur', 'start', false, true, false, 'sticky', false],
    [false, 'canvas', 'blur', 'start', false, true, true, 'sticky', false],
    [true, 'surface', 'blur', 'end', true, false, false, 'fixed', false],
    [true, 'surface', 'blur', 'end', true, true, false, 'fixed', false],
    [true, 'surface', 'blur', 'end', true, true, true, 'fixed', false],
    [true, 'surface', 'blur', 'end', true, false, true, 'fixed', false],
    [true, 'surface', 'blur', 'end', false, true, true, 'fixed', false],
    [true, 'surface', 'blur', 'end', false, false, true, 'fixed', false],
    [true, 'surface', 'blur', 'end', false, false, false, 'fixed', false],
    [true, 'surface', 'blur', 'end', false, true, false, 'fixed', false],
    [true, 'canvas', 'blur', 'end', true, true, true, 'sticky', true],
    [true, 'canvas', 'blur', 'start', true, true, true, 'sticky', true],
    [true, 'canvas', 'blur', 'end', true, true, true, 'sticky', { base: true, xs: false, s: true, m: false, l: true, xl: false }],
  ])(
    'should return correct css for isOpen: %s, background: %s, backdrop: %s, position: %s, hasHeader: %s, hasFooter: %s, hasSubFooter: %s, footerBehavior: %s and fullscreen: %o',
    async (...args) => {
      await validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
