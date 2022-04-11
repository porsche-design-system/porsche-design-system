import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import * as fs from 'fs';
import * as path from 'path';
import * as beautify from 'js-beautify';
import styled, { StyleSheetManager } from 'styled-components';
import { getFocus, headingMedium, textMedium } from '../../../src/jss';
import { createUseStyles, JssProvider } from 'react-jss';
// import 'jest-styled-components';

const cssFilePath = path.resolve('./tests/unit/styles/test.css');
const cssStyles = fs.readFileSync(cssFilePath, 'utf-8');

const SampleStyles = styled.div({ focus: getFocus() as any, heading: headingMedium, text: textMedium });
const useStyles = createUseStyles({ focus: getFocus(), heading: headingMedium, text: textMedium });
let jssStyles: string;

const beautified = (style: string): string => {
  style = beautify.css(style, {
    indent_size: 2,
  });
  return style
    .replace(/\.(.*?){/g, 'div {') // neutralises random class names
    .replace(/'/g, '"')
    .replace(/(media)\s/g, '$1') // remove space after colon
    .replace(/:\s(?=.*)/g, ':'); // remove space after media
};

const StyledComponentsSample = (): JSX.Element => (
  <StyleSheetManager disableVendorPrefixes>
    <SampleStyles />
  </StyleSheetManager>
);

const JssSample = (): JSX.Element => {
  const jssStyles = useStyles();
  return (
    <JssProvider>
      <div className={jssStyles.focus} role="jss-focus">
        jss_focus
      </div>
      <div className={jssStyles.text} role="jss-text">
        jss_text_medium
      </div>
      <div className={jssStyles.heading} role="jss-heading">
        jss_heading_medium
      </div>
    </JssProvider>
  );
};

beforeEach(() => {
  render(<JssSample />);
  jssStyles = document.querySelector('style[data-jss]').innerHTML;
});

describe('JSS, styled-components and SCSS', () => {
  it('should compile styled-components correctly to jss styles', () => {
    render(<StyledComponentsSample />);
    const styledComponentsStyles = document.querySelector('style[data-styled]').innerHTML;
    expect(beautified(jssStyles)).toBe(beautified(styledComponentsStyles));
  });

  it('should compile scss styles correctly to jss styles', () => {
    expect(beautified(jssStyles)).toBe(beautified(cssStyles));
  });
});
