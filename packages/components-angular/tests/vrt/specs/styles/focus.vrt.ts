import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
// TODO: we should move CDP to either shared package or maybe even better to visual-regression-tester itself
import { forceFocusState } from '../../../../../components-js/tests/vrt/puppeteer/helpers';

const id = 'styles-focus';
it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), id, `/${id}`, {
      scenario: async (page) => {
        await forceFocusState(page, 'a');
        await forceFocusState(page, 'button');
      },
    })
  ).toBeFalsy();
});
