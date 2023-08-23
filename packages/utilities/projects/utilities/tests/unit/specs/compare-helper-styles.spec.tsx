/**
 * @jest-environment jsdom
 */
import * as fs from 'fs';
import * as path from 'path';
import * as sass from 'sass';
import { format } from 'prettier';
import styled, { StyleSheetManager } from 'styled-components';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getFocusStyle, headingMediumStyle } from '../../../src/js';
import { createUseStyles } from 'react-jss';

const formatAndNeutralizeStyle = async (style: string): Promise<string> => {
  const STYLED_COMPONENTS_AUTO_GENERATED_CLASS_NAME: string = 'kKdgGY';

  const classRegExp = new RegExp(`(.${STYLED_COMPONENTS_AUTO_GENERATED_CLASS_NAME} )`, 'g');
  style = await format(style, { parser: 'scss' });
  return style
    .replace(classRegExp, '.') // removes random class name from styled-components
    .replace(/(-[0-9]){3}/g, '') // removes random class name suffix from react-jss
    .replace(/\n+/g, ''); // removes empty lines
};

let jssStyles: string;

beforeEach(() => {
  const useStyles = createUseStyles({
    // focus: getFocusStyle(),
    heading: headingMediumStyle,
    // material: frostedGlassHighStyle,
  });

  const JssSample = (): JSX.Element => {
    useStyles();
    return <></>;
  };

  render(<JssSample />);
  jssStyles = document.querySelector('style[data-jss]')!.innerHTML;
});

// TODO: not necessary anymore since we have VRT test for both implementations
// TODO: re-enable frostedGlass test to ensure forced vendor prefixing
xit('should have equal styles for styled-components and jss', async () => {
  const SampleStyles = styled.div({
    focus: getFocusStyle(),
    heading: headingMediumStyle,
    // material: frostedGlassHighStyle,
  });

  render(
    <StyleSheetManager>
      <SampleStyles />
    </StyleSheetManager>
  );
  const styledComponentsStyles = document.querySelector('style[data-styled]')!.innerHTML;
  expect(await formatAndNeutralizeStyle(jssStyles)).toBe(await formatAndNeutralizeStyle(styledComponentsStyles));
});

// TODO: not necessary anymore since we have VRT test for both implementations
xit('should have equal styles for scss and jss', async () => {
  const focusMixin = fs.readFileSync(path.resolve('./src/scss/_focus.scss'), 'utf8');
  const headingMixin = fs.readFileSync(path.resolve('./src/scss/lib/_heading.scss'), 'utf8');
  const frostedGlassMixin = fs.readFileSync(path.resolve('./src/scss/lib/_frosted-glass.scss'), 'utf8');

  const cssStyles = sass.compileString(`
  ${focusMixin} ${headingMixin} ${frostedGlassMixin}
  .focus {
    @include pds-focus(2px);
  };
  .heading {
    @include pds-heading-medium;
  }
`);
  /* .material {
    @include pds-frosted-glass-high;
  } */
  expect(await formatAndNeutralizeStyle(jssStyles)).toBe(await formatAndNeutralizeStyle(cssStyles.css));
});
