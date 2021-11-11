import { getComponentCss } from './toast-styles';
import type { ToastOffset } from './toast-utils';

describe('getComponentCss()', () => {
  it.each<ToastOffset>([{ bottom: 10 }, { bottom: 100 }, undefined])(
    'should return correct css for offset: %o',
    (offset) => {
      expect(getComponentCss(offset)).toMatchSnapshot();
    }
  );
});
