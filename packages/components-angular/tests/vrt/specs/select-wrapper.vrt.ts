import {
  defaultViewports,
  getVisualRegressionSkeletonTester,
  getVisualRegressionTester,
  itif,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'select-wrapper', '/select-wrapper', {
      scenario: async (page) => {
        await page.click('#open-options');
        await page.evaluate(() => (window as any).componentsReady());
      },
    })
  ).toBeFalsy();
});

itif('should have no visual regression for skeleton', async () => {
  expect(
    await vrtTest(getVisualRegressionSkeletonTester(), 'select-wrapper-skeleton', '/select-wrapper-skeleton')
  ).toBeFalsy();
});
