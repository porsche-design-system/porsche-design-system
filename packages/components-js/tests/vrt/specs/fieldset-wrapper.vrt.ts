import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  itIfSkeletonsActive,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'fieldset-wrapper', '/#fieldset-wrapper')).toBeFalsy();
});

itIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(getVisualRegressionSkeletonTester(), 'fieldset-wrapper-skeleton', '/#fieldset-wrapper-skeleton')
  ).toBeFalsy();
});
