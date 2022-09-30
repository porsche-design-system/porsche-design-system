import { getComponentCss, getSlottedCss } from './table-styles';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    expect(getComponentCss()).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-table');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-table');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
