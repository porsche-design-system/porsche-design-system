import {
  defaultViewports,
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionTester,
  marqueViewports,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'marque', '/marque')).toBeFalsy();
});

it.each(marqueViewports)('should have no visual regression on retina 2x display for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionMarque2xTester(viewport), 'marque-2x', '/marque')).toBeFalsy();
});

it.each(marqueViewports)('should have no visual regression on retina 3x display for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionMarque3xTester(viewport), 'marque-3x', '/marque')).toBeFalsy();
});
