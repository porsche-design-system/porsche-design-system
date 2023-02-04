import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

// TODO: due to rounding differences between SCSS and JS, screenshot can't be in in sync with React integration
xit.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'utilities-grid-example', '/utilities-grid-example')
  ).toBeFalsy();
});
