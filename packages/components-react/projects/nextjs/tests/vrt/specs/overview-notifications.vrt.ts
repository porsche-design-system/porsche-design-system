import { getVisualRegressionOverviewTester, vrtTest } from '@porsche-design-system/shared/testing';

xit('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview-notifications', '/overview-notifications', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});
