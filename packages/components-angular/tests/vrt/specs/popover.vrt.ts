import {
  defaultViewports,
  getVisualRegressionTester,
  vrtTest,
  openPopoversAndHighlightSpacer,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'popover', '/popover', {
      scenario: openPopoversAndHighlightSpacer,
    })
  ).toBeFalsy();
});
