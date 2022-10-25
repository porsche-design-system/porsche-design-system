import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'select-wrapper', '/select-wrapper', {
      javaScriptEnabled: false,
      scenario: async (page) => {
        await page.click('#open-options');
        await page.evaluate(() => (window as any).componentsReady());
      },
    })
  ).toBeFalsy();
});
