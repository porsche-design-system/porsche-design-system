import { getComponentCss } from './tabs-styles';

xdescribe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
