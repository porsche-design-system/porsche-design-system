import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

// TODO: we should setup Playwright with different browser engines to test
it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'utilities-grid-example', '/utilities-grid-example')
  ).toBeFalsy();
});
