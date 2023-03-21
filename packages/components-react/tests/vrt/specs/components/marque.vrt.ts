import {
  defaultViewports,
  getVisualRegressionWordmarkAndMarque2xTester,
  getVisualRegressionWordmarkAndMarque3xTester,
  getVisualRegressionTester,
  wordmarkAndMarqueViewports,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'marque', '/marque')).toBeFalsy();
});

it.each(wordmarkAndMarqueViewports)(
  'should have no visual regression on retina 2x display for viewport %s',
  async (viewport) => {
    expect(await vrtTest(getVisualRegressionWordmarkAndMarque2xTester(viewport), 'marque-2x', '/marque')).toBeFalsy();
  }
);

it.each(wordmarkAndMarqueViewports)(
  'should have no visual regression on retina 3x display for viewport %s',
  async (viewport) => {
    expect(await vrtTest(getVisualRegressionWordmarkAndMarque3xTester(viewport), 'marque-3x', '/marque')).toBeFalsy();
  }
);
