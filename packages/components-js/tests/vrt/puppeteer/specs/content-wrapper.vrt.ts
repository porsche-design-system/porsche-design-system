import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

xit.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'content-wrapper', '/#content-wrapper')).toBeFalsy();
});
