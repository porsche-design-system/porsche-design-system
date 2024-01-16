import { expect } from '@jest/globals';

/*
  TODO: Existing tests for:
    - @hover media query for hover styles
    should also be covered for all getComponentCss conditions
*/
export const validateCssAndMatchSnapshot = (css: string, isInternal = false) => {
  // We shouldn't use visibility: visible since it cannot be overwritten, use inherit instead
  expect(css).not.toMatch(/visibility:\s*(?:var\(.+,\s*visible\s*\)|visible);/);
  // Invalid css which was produced before
  expect(css).not.toMatch('. {');
  // Expect no !important rule on display style of :host selector since it should be overridable (Match all display with following !important rule)
  expect(css).not.toMatch(/:host\s*{\s*[^}]*display:\s*(?:var\(\s*--[\w-]+\s*,\s*[\w-]+\s*\)|[\w-]+)\s*!important/);
  // Expect all slotted styles to be !important since they shouldn't be overridable
  // (Match all ; without preceding !important, svg+xml and height, min-height and resize css props within ::slotted)
  expect(css).not.toMatch(
    /(?<=::slotted.*{[^}]*)(?<!(!important|svg\+xml|(height|min-height|resize):\s*.*));(?=[^}]*)/
  );
  // All ":hover" pseudo selectors should be wrapped in "@media (hover: hover)" query (Match :hover style without preceding hover media query)
  // Nested case does not work
  // expect(css).not.toMatch(/(?<!@media\(hover:hover\)\s*{[^{}]*?):hover[^)]/);

  if (!isInternal) {
    // Should have ":host([hidden])" styles
    expect(css).toMatch(/:host\(\[hidden]\)\s*{\s*display:\s*none\s*!important;\s*}/);
  }

  expect(css).toMatchSnapshot();
};
