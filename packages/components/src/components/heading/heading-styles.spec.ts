import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['2xl', 'normal', 'start', 'primary', 'none', false],
    ['xl', 'normal', 'start', 'primary', 'auto', false],
    ['xl', 'normal', 'end', 'primary', 'manual', false],
    ['lg', 'normal', 'center', 'inherit', 'inherit', true],
    ['md', 'normal', 'center', 'inherit', 'none', true],
    ['sm', 'normal', 'center', 'inherit', 'none', true],
    ['sm', 'normal', 'inherit', 'inherit', 'none', true],
    ['inherit', 'normal', 'center', 'inherit', 'none', true],
    [{ base: 'sm', xs: 'md', s: 'lg', m: 'xl', l: '2xl', xl: 'lg' }, 'normal', 'end', 'inherit', 'none', false],
  ])('should return correct css for size: %j, align: %s, color: %s, hyphens: %s, and ellipsis: %s', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
