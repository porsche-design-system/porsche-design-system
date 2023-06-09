import {
  furtherExtendedViewports,
  getVisualRegressionTester,
  getVisualRegressionStatesTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import { mainViewSelector } from '../helpers';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'story', '/components/pagination/examples')
  ).toBeFalsy();
});

it('should have no visual regression with dark theme', async () => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), 'story-dark', '/components/pagination/examples', {
      elementSelector: mainViewSelector,
      scenario: async (page) => {
        await page.click('.playground > p-tabs-bar > button:nth-of-type(2)');
        await new Promise((resolve) => setTimeout(resolve, 500)); // wait for animation/transition of tabs bar
      },
    })
  ).toBeFalsy();
});
