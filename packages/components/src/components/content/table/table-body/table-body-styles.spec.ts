import { getComponentCss } from './table-body-styles';
import * as jssUtils from './../../../../utils/jss';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});
