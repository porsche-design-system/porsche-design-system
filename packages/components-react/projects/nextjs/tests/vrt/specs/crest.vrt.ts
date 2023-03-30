import {
  defaultViewports,
  getVisualRegressionCrest2xTester,
  getVisualRegressionCrest3xTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'crest', '/crest', { javaScriptEnabled: false })
  ).toBeFalsy();
});

it('should have no visual regression on retina 2x display', async () => {
  expect(
    await vrtTest(getVisualRegressionCrest2xTester(1000), 'crest-2x', '/crest', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});

it('should have no visual regression on retina 3x display', async () => {
  expect(
    await vrtTest(getVisualRegressionCrest3xTester(1000), 'crest-3x', '/crest', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});
