import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const designToken = 'design-tokens-grid';
// TODO: Angular/SCSS version renders slightly different compared to React/JSS
xit.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), designToken, `/${designToken}`)).toBeFalsy();
});
