import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
import { routerViewSelector } from '../helpers';
import { forceFocusState } from '../../../../components-js/tests/vrt/helpers';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'markdown', '/markdown', {
      elementSelector: routerViewSelector,
      // focus first of two links
      scenario: (page) => forceFocusState(page, 'a[href="https://designsystem.porsche.com/"]:not([title])'),
    })
  ).toBeFalsy();
});
