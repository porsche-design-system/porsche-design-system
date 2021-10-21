import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'markdown', '/markdown', {
      elementSelector: routerViewSelector,
    })
  ).toBeFalsy();
});
