import { getComponentCss } from './link-social-styles';

describe('getComponentCss()', () => {
  it('should return correct css: %s', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
