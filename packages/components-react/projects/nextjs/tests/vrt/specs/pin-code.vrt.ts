import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { openPinCodeScenario } from 'shared/src/testing/vrt-helper';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'pin-code', '/pin-code', {
      javaScriptEnabled: false,
      scenario: (page) => openPinCodeScenario(page),
    })
  ).toBeFalsy();
});
