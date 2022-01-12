import { getComponentCss } from './button-group-styles';
import type { ButtonGroupDirection } from './button-group-utils';

describe('getComponentCss()', () => {
  it.each<ButtonGroupDirection>([
    { base: 'column', xs: 'row' },
    'column',
    'row',
    { base: 'row', xs: 'column', s: 'row', m: 'column', l: 'row', xl: 'column' },
  ])('should return correct css for direction: %s', (direction) => {
    expect(getComponentCss(direction)).toMatchSnapshot();
  });
});
