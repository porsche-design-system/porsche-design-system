import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

const id = 'styles-flyout-grid';
// TODO: Angular/SCSS version renders slightly different compared to React/JSS
it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), id, `/${id}`)).toBeFalsy();
});
