import {
  defaultViewports,
  getVisualRegressionTester,
  pinCodeScenario,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'pin-code', '/pin-code', {
      javaScriptEnabled: false,
      scenario: (page) => pinCodeScenario(page),
    })
  ).toBeFalsy();
});
