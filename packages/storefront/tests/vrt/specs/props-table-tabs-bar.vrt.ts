import { getVisualRegressionPropTableTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';

describe('Props Table Tabs-Bar', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionPropTableTester(), 'props-table-tabs-bar', '/components/tabs-bar/props', {
        elementSelector: routerViewSelector,
      })
    ).toBeFalsy();
  });
});
