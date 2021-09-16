import { getComponentCss } from './modal-styles';
import * as jssUtils from './../../../utils/jss';

describe('getComponentCss()', () => {
  it.each([[false], [true]])('should return correct css for open: %s', (open: boolean) => {
    expect(getComponentCss(open)).toMatchSnapshot();
  });
});
