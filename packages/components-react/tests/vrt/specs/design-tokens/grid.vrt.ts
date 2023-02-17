import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const designToken = 'design-tokens-grid';
it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), designToken, `/${designToken}`)).toBeFalsy();
});
