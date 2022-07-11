import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  itIfSkeletonsActive,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link-social', '/link-social')).toBeFalsy();
});

itIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(getVisualRegressionSkeletonTester(), 'link-social-skeleton', '/link-social-skeleton')
  ).toBeFalsy();
});
