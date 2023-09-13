import { getVisualRegressionPropTableTester, vrtTest } from '@porsche-design-system/shared/testing';
import { mainViewSelector } from '../helpers';

it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionPropTableTester(), 'props-table-tabs-bar', '/components/tabs-bar/props', {
      prefersColorScheme: 'light',
      elementSelector: mainViewSelector,
    })
  ).toBeFalsy();
});
