import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from '../../../src/App';

afterEach(cleanup);

const beautify = (style: string): string =>
  style
    .replace(/\.\\(?=:)/g, '') // remove default '.'
    .replace(/[\n\\]+/g, '') // remove backslashes
    .replace(/\s(?={)/g, '') // remove space before opening curly brace
    .replace(/;(?=\s*})/g, '') // remove semicolon before closing curly brace
    .replace(/(media)\s/g, '$1') // remove space after media
    .replace(/,\s/g, ',') // remove unneeded white space after comma separation
    .replace(/\s\s+/g, '') // remove white space
    .replace(/:\s(?=.*)/g, ':') // remove white space after colon
    .replace(/\n+/g, '') // remove new line
    .replace(/\.(.*?)(div)/g, 'div');

describe('JSS, styled-components and SCSS', () => {
  it('should have the same styles applied', () => {
    render(<App />);
    const getJssStyle = document.querySelector('style[data-jss]').innerHTML;
    const getStyledComponentStyles = document.querySelector('style[data-styled]').innerHTML;
    expect(beautify(getJssStyle).split('').sort()).toEqual(beautify(getStyledComponentStyles).split('').sort());
  });
});
