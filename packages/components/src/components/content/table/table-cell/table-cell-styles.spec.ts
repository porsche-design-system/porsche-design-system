import { getComponentCss } from './table-cell-styles';
import * as jssUtils from './../../../../utils/jss';

describe('getComponentCss()', () => {
  it.each([[true], [false]])('should return correct css for multiline: %s', (multiline: boolean) => {
    expect(getComponentCss(multiline)).toMatchSnapshot();
  });
});
