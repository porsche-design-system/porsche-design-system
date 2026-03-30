import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './text-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['sm', 'normal', 'start', 'primary', 'none', false],
    ['sm', 'normal', 'start', 'primary', 'auto', false],
    ['sm', 'normal', 'end', 'primary', 'manual', false],
    ['sm', 'normal', 'inherit', 'primary', 'inherit', false],
    ['lg', 'semibold', 'start', 'info', 'none', true],
    ['md', 'bold', 'end', 'contrast-high', 'none', true],
    [{ base: 'sm', xs: 'lg', s: 'md', m: 'inherit', l: 'xs', xl: 'xl' }, 'bold', 'center', 'error', 'none', true],
  ])(
    'should return correct css for size: %j, weight: %s, align: %s, color: %s, hyphens: %s and ellipsis: %o',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
