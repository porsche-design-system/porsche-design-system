import {
  getVisualRegressionOverviewTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

xit('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/#overview', {
      scenario: async (page) => {
        await openPopoversAndHighlightSpacer(page);
        await page.mouse.click(0, 0); // Click top left corner of the page to remove focus on banner
      },
    })
  ).toBeFalsy();
});
