/**
 * @jest-environment jsdom
 */
import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';
import * as prettier from 'prettier';
import styled, { StyleSheetManager } from 'styled-components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { getFocus, headingMedium } from '../../../src/js';
import { createUseStyles } from 'react-jss';

const focusMixin: string = fs.readFileSync(path.resolve('./src/scss/_focus.scss'), 'utf8');
const headingMixin: string = fs.readFileSync(path.resolve('./src/scss/lib/_heading.scss'), 'utf8');

const cssStyles = sass.compileString(`
  ${focusMixin} ${headingMixin}
  .focus {
    @include pds-focus($color: currentColor, $offset: 2px);
  };
  .heading {
    @include pds-heading-medium;
  }
`);

const SampleStyles = styled.div({ focus: getFocus(), heading: headingMedium });
const useStyles = createUseStyles({ focus: getFocus(), heading: headingMedium });
let jssStyles: string;
const STYLED_COMPONENTS_AUTO_GENERATED_CLASS_NAME: string = 'cgVBvh';

const formatAndNeutralizeStyle = (style: string): string => {
  const classRegExp = new RegExp(`(.${STYLED_COMPONENTS_AUTO_GENERATED_CLASS_NAME} )`, 'g');
  style = prettier.format(style, { parser: 'scss' });
  return style
    .replace(classRegExp, '.') // removes random class name from styled-components
    .replace(/(-[0-9]){3}/g, '') // removes random class name suffix from react-jss
    .replace(/\n+/g, ''); // removes empty lines
};

const StyledComponentsSample = (): JSX.Element => (
  <StyleSheetManager disableVendorPrefixes>
    <SampleStyles />
  </StyleSheetManager>
);

const JssSample = (): JSX.Element => {
  useStyles();
  return <div />;
};

beforeEach(() => {
  render(<JssSample />);
  jssStyles = document.querySelector('style[data-jss]')!.innerHTML;
});

it('should have equal styles for styled-components and jss', () => {
  render(<StyledComponentsSample />);
  const styledComponentsStyles = document.querySelector('style[data-styled]')!.innerHTML;
  expect(formatAndNeutralizeStyle(jssStyles)).toBe(formatAndNeutralizeStyle(styledComponentsStyles));
});

it('should have equal styles for scss and jss', () => {
  expect(formatAndNeutralizeStyle(jssStyles)).toBe(formatAndNeutralizeStyle(cssStyles.css));
});
