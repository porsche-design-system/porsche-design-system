import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'link-pure', '/link-pure')).toBeFalsy();
});

it('should have no visual regression for skeleton', async () => {
  expect(await vrtTest(getVisualRegressionSkeletonTester(), 'link-pure-skeleton', '/link-pure-skeleton')).toBeFalsy();
});
