import { getDefaultSlottedCss } from './styles';
import type { Styles } from './';

describe('getDefaultSlottedCss()', () => {
  const host = document.createElement('p-some-component');
  const prefixedHost = document.createElement('prefixed-p-some-component');
  const additionalStyles: Styles = { '& a': { color: 'deeppink', background: 'deepskyblue' } };

  it('should return correct css', () => {
    expect(getDefaultSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    expect(getDefaultSlottedCss(prefixedHost)).toMatchSnapshot();
  });

  it('should return correct css, extend and overwrite default css', () => {
    expect(getDefaultSlottedCss(host, additionalStyles)).toMatchSnapshot();
  });

  it('should return correct css with prefix, extend and overwrite default css', () => {
    expect(getDefaultSlottedCss(prefixedHost, additionalStyles)).toMatchSnapshot();
  });
});
