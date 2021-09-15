import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers/setup';

describe('Story', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'story', '/components/pagination/examples', {
        elementSelector: routerViewSelector,
        scenario: (page) => page.click('.playground:nth-of-type(1) > p-tabs-bar > button:nth-of-type(2)'),
      })
    ).toBeFalsy();
  });
});
