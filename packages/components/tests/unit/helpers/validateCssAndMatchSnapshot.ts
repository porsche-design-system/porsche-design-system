import { expect } from '@jest/globals';
import { componentMeta } from '@porsche-design-system/component-meta';

/*
  TODO: Existing tests for:
    - @hover media query for hover styles
    should also be covered for all getComponentCss conditions
*/
export const validateCssAndMatchSnapshot = (css: string) => {
  // Extract componentMeta from testPath, if it's a functional component this will be undefined
  const currentComponentMeta =
    componentMeta[`p-${expect.getState().testPath.match(/\/([^\/]+)\/[^\/]+\.spec\.ts/)[1]}`];
  // We shouldn't use visibility: visible since it cannot be overridden, use inherit instead
  expect(css).not.toMatch(/visibility:\s*(?:var\(.+,\s*visible\s*\)|visible);/);
  // Invalid css which was produced before
  expect(css).not.toMatch('. {');
  // Expect no !important rule on display style of :host selector since it should be overridable (Match all display with following !important rule)
  expect(css).not.toMatch(/:host\s{\n\tdisplay:\s(?:var\(([a-z-0-9,\s]+)\)|[\w-]+)\s!important/);
  // Expect all slotted styles to be !important since they shouldn't be overridable
  // (Match all ; without preceding !important, svg+xml and height, min-height and resize css props within ::slotted)
  expect(css).not.toMatch(
    /(?<=::slotted.*{[^}]*)(?<!(!important|svg\+xml|(height|min-height|resize):\s*.*));(?=[^}]*)/
  );
  if (currentComponentMeta && !currentComponentMeta.isInternal) {
    // Should have ":host([hidden])" styles
    expect(css).toMatch(/:host\(\[hidden]\)\s*{\s*display:\s*none\s*!important;\s*}/);
  }
  expect(css).toMatchSnapshot();
};
