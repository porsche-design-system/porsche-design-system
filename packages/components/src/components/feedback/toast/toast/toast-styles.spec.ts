import { getComponentCss } from './toast-styles';
import type { ToastOffset } from './toast-utils';

describe('getComponentCss()', () => {
  it.each<ToastOffset>([{ base: 10 }, { base: 10, xs: 20, s: 10, m: 20, l: 10, xl: 20 }, undefined])(
    'should return correct css for offset: %o',
    (offset) => {
      expect(getComponentCss(offset)).toMatchSnapshot();
    }
  );
});
