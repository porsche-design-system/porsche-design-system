import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'home', '/')
  ).toBeFalsy();
});
