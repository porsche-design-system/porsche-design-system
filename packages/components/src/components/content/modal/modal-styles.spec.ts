import { getComponentCss } from './modal-styles';

describe('getComponentCss()', () => {
  it.each<boolean>([false, true])('should return correct css for open: %s', (open) => {
    expect(getComponentCss(open)).toMatchSnapshot();
  });
});
