import { getVisualRegressionTesterPropTable, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers/setup';

describe('Props Table Button', () => {
  it('should have no visual regression', async () => {
    expect(
      await vrtTest(getVisualRegressionTesterPropTable(), 'props-table-button', '/components/button/props', {
        elementSelector: routerViewSelector,
      })
    ).toBeFalsy();
  });
});
