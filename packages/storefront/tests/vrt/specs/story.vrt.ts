import {
  furtherExtendedViewports,
  getVisualRegressionTester,
  getVisualRegressionStatesTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import { mainViewSelector } from '../helpers';

// TODO: we shouldn't rely on retries since computed result has to be deterministic
jest.retryTimes(3);

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
        await page.mouse.move(0, 0); // avoid potential frosted glass hover issues on tabs-bar
        await new Promise((resolve) => setTimeout(resolve, 500)); // wait for animation/transition of tabs bar
      },
    })
  ).toBeFalsy();
});
