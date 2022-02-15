import {
  defaultViewports,
  getVisualRegressionTester,
  getVisualRegressionStatesTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'story', '/components/pagination/examples', {
      elementSelector: routerViewSelector,
    })
  ).toBeFalsy();
});

it('should have no visual regression with dark theme', async () => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), 'story-dark', '/components/pagination/examples', {
      elementSelector: routerViewSelector,
      scenario: async (page) => {
        await page.click('.playground > p-tabs-bar > button:nth-of-type(2)');
        await page.waitForTimeout(500); // wait for animation/transition of tabs bar
      },
    })
  ).toBeFalsy();
});
