import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'radio-button-wrapper', '/radio-button-wrapper')
  ).toBeFalsy();
});

it('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(
      getVisualRegressionSkeletonTester(),
      'radio-button-wrapper-skeleton',
      '/radio-button-wrapper-skeleton'
    )
  ).toBeFalsy();
});
