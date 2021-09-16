import { addComponentCss, getComponentCss } from './table-cell-styles';
import * as jssUtils from './../../../../utils/jss';

describe('addComponentCss()', () => {
  it('should call getCachedComponentCss() to retrieve cached css', () => {
    const host = document.createElement('p-table-cell');
    jest.spyOn(jssUtils, 'attachCss').mockImplementation(() => {});
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    addComponentCss(host, false);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), false);
  });
});

describe('getComponentCss()', () => {
  it.each([[true], [false]])('should return correct css for multiline: %s', (multiline: boolean) => {
    expect(getComponentCss(multiline)).toMatchSnapshot();
  });
});
