import { getSlottedCss } from './link-button-tile-styles';

describe('getSlottedCss()', () => {
  it('should return correct css for p-link-tile', () => {
    const host = document.createElement('p-link-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix for p-link-tile', () => {
    const host = document.createElement('prefixed-p-link-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css for p-button-tile', () => {
    const host = document.createElement('p-button-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix for p-button-tile', () => {
    const host = document.createElement('prefixed-p-button-tile');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
