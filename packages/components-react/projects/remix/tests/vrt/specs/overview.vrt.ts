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
      javaScriptEnabled: false,
      scenario: (page) => openPopoversAndHighlightSpacer(page),
    })
  ).toBeFalsy();
});

it('should have no visual regression for flaky', async () => {
  expect(
    await vrtTest(getVisualRegressionOverviewTester(), 'overview-flaky', '/overview-flaky', {
      javaScriptEnabled: false,
      scenario: (page) => openPopoversAndHighlightSpacer(page),
    })
  ).toBeFalsy();
});
