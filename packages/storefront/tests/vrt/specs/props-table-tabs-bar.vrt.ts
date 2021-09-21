import { getVisualRegressionTesterPropTable, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers/setup';

describe('Props Table Tabs-Bar', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTesterPropTable(), 'props-table-tabs-bar', '/components/tabs-bar/props', {
        elementSelector: routerViewSelector,
      })
    ).toBeFalsy();
  });
});
