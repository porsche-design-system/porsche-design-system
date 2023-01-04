import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

xit.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'cookies', '/', {
      scenario: async (page) => {
        await page.click('#cookies');
        await page.waitForSelector('#porsche-design-system-fallbacks-cookies');
      },
    })
  ).toBeFalsy();
});
