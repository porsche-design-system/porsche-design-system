import { getComponentCss } from './table-cell-styles';

xdescribe('getComponentCss()', () => {
  it.each<boolean>([true, false])('should return correct css for multiline: %s', (multiline) => {
    expect(getComponentCss(multiline)).toMatchSnapshot();
  });
});
