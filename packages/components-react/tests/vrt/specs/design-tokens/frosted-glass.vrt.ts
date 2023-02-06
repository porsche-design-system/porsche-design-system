import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const designToken = 'design-tokens-frosted-glass';
it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), designToken, `/${designToken}`)).toBeFalsy();
});
