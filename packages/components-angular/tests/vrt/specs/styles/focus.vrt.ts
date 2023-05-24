import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';
// TODO: we should move CDP to either shared package or maybe even better to visual-regression-tester itself
import { forceFocusState } from '../../../../../components-js/tests/vrt/puppeteer/helpers';

const id = 'styles-focus';
it('should have no visual regression', async () => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), id, `/${id}`, {
      scenario: async (page) => {
        await forceFocusState(page, 'a');
        await forceFocusState(page, 'button');
      },
    })
  ).toBeFalsy();
});
