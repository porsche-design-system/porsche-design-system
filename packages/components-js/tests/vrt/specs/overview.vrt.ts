import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

it('should have no visual regression', async () => {
  expect(await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/#overview')).toBeFalsy();
});
