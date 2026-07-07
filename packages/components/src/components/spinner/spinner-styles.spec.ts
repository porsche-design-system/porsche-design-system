import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './spinner-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['primary', 'sm'],
    ['primary', 'md'],
    ['primary', 'lg'],
    ['primary', 'inherit'],
    ['primary', { base: 'md', xs: 'sm', s: 'md', m: 'sm', l: 'md', xl: 'sm' }],
    ['primary', 'sm'],
    ['primary', 'md'],
    ['primary', 'lg'],
    ['primary', 'inherit'],
    ['primary', { base: 'md', xs: 'sm', s: 'md', m: 'sm', l: 'md', xl: 'sm' }],
  ])('should return correct css for size: %j', async (...args) => {
    await validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
