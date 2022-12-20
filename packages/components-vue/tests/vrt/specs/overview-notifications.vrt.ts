import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing/vrt';

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview-notifications', '/overview-notifications')
  ).toBeFalsy();
});
