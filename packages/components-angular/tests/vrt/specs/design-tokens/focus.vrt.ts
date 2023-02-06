import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const designToken = 'design-tokens-focus';
// TODO: we need to force focus state by CDP
// TODO: Angular/SCSS version renders slightly different compared to React/JSS
xit.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), designToken, `/${designToken}`)).toBeFalsy();
});
