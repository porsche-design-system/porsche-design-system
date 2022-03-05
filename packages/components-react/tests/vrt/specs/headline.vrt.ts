import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'headline', '/headline')).toBeFalsy();
});

it.each(defaultViewports)('should have no skeleton visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'headline-skeleton', '/headline-skeleton')).toBeFalsy();
});
