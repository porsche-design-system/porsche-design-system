import { expect } from '@jest/globals';

/*
  TODO: Existing tests for:
    - !important on host display style
    - !important on slotted styles
    - @hover media query for hover styles
    - Host hidden styles
    should also be covered for all getComponentCss conditions
*/
export const validateCssAndMatchSnapshot = (css: string) => {
  // We shouldn't use visibility: visible since it cannot be overwritten, use inherit instead
  expect(css).not.toMatch(/visibility:\s*(?:var\(.+,\s*visible\s*\)|visible);/);
  // Invalid css which was produced before
  expect(css).not.toMatch('. {');
  expect(css).toMatchSnapshot();
};
