import { addComponentCss, getComponentCss } from './modal-styles';
import * as jssUtils from './../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-modal');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, true);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), true);
  });
});

describe('getComponentCss()', () => {
  it.each([[false], [true]])('should return correct css for open: %s', (open: boolean) => {
    expect(getComponentCss(open)).toMatchSnapshot();
  });
});
