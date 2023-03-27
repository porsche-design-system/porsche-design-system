import { getComponentCss } from './table-row-styles';

xdescribe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
