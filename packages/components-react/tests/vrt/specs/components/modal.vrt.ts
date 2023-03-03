import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(extendedViewports)('should have no visual regression for basic modal for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'modal', '/modal')).toBeFalsy();
});
