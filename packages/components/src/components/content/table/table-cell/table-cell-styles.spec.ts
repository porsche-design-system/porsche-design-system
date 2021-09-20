import { getComponentCss } from './table-cell-styles';

describe('getComponentCss()', () => {
  it.each([[true], [false]])('should return correct css for multiline: %s', (multiline: boolean) => {
    expect(getComponentCss(multiline)).toMatchSnapshot();
  });
});
