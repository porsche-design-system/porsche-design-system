import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['2xl', 'normal', 'start', 'primary', false],
    ['xl', 'normal', 'start', 'primary', false],
    ['xl', 'normal', 'end', 'primary', false],
    ['lg', 'normal', 'center', 'inherit', true],
    ['md', 'normal', 'center', 'inherit', true],
    ['sm', 'normal', 'center', 'inherit', true],
    ['sm', 'normal', 'inherit', 'inherit', true],
    ['inherit', 'normal', 'center', 'inherit', true],
    [{ base: 'sm', xs: 'md', s: 'lg', m: 'xl', l: '2xl', xl: 'lg' }, 'normal', 'end', 'inherit', false],
  ])('should return correct css for size: %j, align: %s, color: %s and ellipsis: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
