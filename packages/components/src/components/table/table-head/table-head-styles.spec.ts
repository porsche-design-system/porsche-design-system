import { getComponentCss } from './table-head-styles';

xdescribe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
