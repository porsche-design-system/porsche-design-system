import { getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers/setup';

describe('Markdown', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTester(), 'markdown', '/markdown', {
        elementSelector: routerViewSelector,
      })
    ).toBeFalsy();
  });
});
