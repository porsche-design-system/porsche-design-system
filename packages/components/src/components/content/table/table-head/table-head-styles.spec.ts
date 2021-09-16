import { getComponentCss } from './table-head-styles';
import * as jssUtils from './../../../../utils/jss';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
