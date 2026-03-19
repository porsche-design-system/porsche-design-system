import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['sm', 'normal', 'start', 'primary', false],
    ['sm', 'normal', 'start', 'primary', false],
    ['sm', 'normal', 'end', 'primary', false],
    ['sm', 'normal', 'inherit', 'primary', false],
    ['lg', 'semibold', 'start', 'info', true],
    ['md', 'bold', 'end', 'contrast-high', true],
    [{ base: 'sm', xs: 'lg', s: 'md', m: 'inherit', l: 'xs', xl: 'xl' }, 'bold', 'center', 'error', true],
  ])('should return correct css for size: %j, weight: %s, align: %s, color: %s and ellipsis: %o', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
