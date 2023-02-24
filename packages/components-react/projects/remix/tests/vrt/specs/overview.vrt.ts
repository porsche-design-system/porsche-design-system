import {
  getVisualRegressionOverviewTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

// temporary disable it
xit('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview', '/overview', {
      javaScriptEnabled: false,
      scenario: (page) => openPopoversAndHighlightSpacer(page),
    })
  ).toBeFalsy();
});
