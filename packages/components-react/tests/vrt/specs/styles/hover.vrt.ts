import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';
// TODO: we should move CDP to either shared package or maybe even better to visual-regression-tester itself
import { forceHoverState } from '../../../../../components-js/tests/vrt/puppeteer/helpers';

const id = 'styles-hover';
it('should have no visual regression', async () => {
  // TODO: test is pointless?
  // hover media query isn't supported by puppeteer and therefore no hover style is visible
  expect(
    await vrtTest(getVisualRegressionStatesTester(), id, `/${id}`, {
      scenario: async (page) => {
        await forceHoverState(page, 'a');
      },
    })
  ).toBeFalsy();
});
