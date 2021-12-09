import { getComponentCss } from './toast-styles';
import type { ToastOffset } from './toast-utils';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
