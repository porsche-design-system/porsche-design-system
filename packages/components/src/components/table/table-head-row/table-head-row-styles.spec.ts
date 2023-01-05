import { getComponentCss } from './table-head-row-styles';

xdescribe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
