import { furtherExtendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'flyout', '/flyout', {
      javaScriptEnabled: false,
      scenario: async (page) => {
        await page.mouse.click(0, 0); // click top left corner of the page to remove focus on flyout
        await page.$$eval('.scroll-here', (scrollElements) => {
          scrollElements.forEach((el) =>
            el.scrollIntoView(el.classList.contains('vertical-center') ? { block: 'center' } : true)
          );
        });
      },
    })
  ).toBeFalsy();
});
