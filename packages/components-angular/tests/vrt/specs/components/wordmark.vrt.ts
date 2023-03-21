import {
  defaultViewports,
  getVisualRegressionWordmarkAndMarque2xTester,
  getVisualRegressionWordmarkAndMarque3xTester,
  getVisualRegressionTester,
  wordmarkAndMarqueViewports,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'wordmark', '/wordmark')).toBeFalsy();
});

it.each(wordmarkAndMarqueViewports)(
  'should have no visual regression on retina 2x display for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionWordmarkAndMarque2xTester(viewport), 'wordmark-2x', '/wordmark')
    ).toBeFalsy();
  }
);

it.each(wordmarkAndMarqueViewports)(
  'should have no visual regression on retina 3x display for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionWordmarkAndMarque3xTester(viewport), 'wordmark-3x', '/wordmark')
    ).toBeFalsy();
  }
);
