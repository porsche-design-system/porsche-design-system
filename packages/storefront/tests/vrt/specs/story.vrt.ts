import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'story', '/components/pagination/examples', {
      elementSelector: routerViewSelector,
      scenario: async (page) => {
        await page.click('.playground > p-tabs-bar > button:nth-of-type(2)');
        await page.waitForTimeout(500); // it's actual js scrolling and no transition
      },
    })
  ).toBeFalsy();
});
