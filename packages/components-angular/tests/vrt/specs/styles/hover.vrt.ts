import { extendedViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';
// TODO: we should move CDP to either shared package or maybe even better to visual-regression-tester itself
import { forceHoverState } from '../../../../../components-js/tests/vrt/puppeteer/helpers';

const id = 'styles-hover';
it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), id, `/${id}`, {
      scenario: async (page) => {
        await forceHoverState(page, 'a');
      },
    })
  ).toBeFalsy();
});
