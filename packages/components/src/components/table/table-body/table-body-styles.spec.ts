import { getComponentCss } from './table-body-styles';

xdescribe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
