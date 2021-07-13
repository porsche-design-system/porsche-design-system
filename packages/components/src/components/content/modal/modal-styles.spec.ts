import { getComponentCss } from './modal-styles';

describe('getComponentCss()', () => {
  it.each([[false], [true]])('should return correct css for open: %s', (open: boolean) => {
    expect(getComponentCss(open)).toMatchSnapshot();
  });
});
