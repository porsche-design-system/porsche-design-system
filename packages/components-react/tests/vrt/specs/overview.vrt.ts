import {
  getVisualRegressionOverviewTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

// TODO: (overview test is flaky) we shouldn't rely on retries since computed result has to be deterministic
jest.retryTimes(3);

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/overview', {
      scenario: async (page) => {
        await openPopoversAndHighlightSpacer(page);
        await page.mouse.click(0, 0); // Click top left corner of the page to remove focus on banner
      },
    })
  ).toBeFalsy();
});
