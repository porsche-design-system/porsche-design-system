import { getVisualRegressionPropTableTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';

xit('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionPropTableTester(), 'props-table-tabs-bar', '/components/tabs-bar/props', {
      elementSelector: routerViewSelector,
    })
  ).toBeFalsy();
});
