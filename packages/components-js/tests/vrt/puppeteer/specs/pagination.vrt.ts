import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import type { Theme } from '@porsche-design-system/utilities-v2';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'pagination', '/#pagination')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('pagination-states', async () => {
      const page = vrt.getPage();
      const head = `<style>p-pagination { margin-bottom: 1rem; }</style>`;

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-pagination total-items-count="500" items-per-page="25" active-page="1" theme="${theme}"></p-pagination>

        <p-pagination total-items-count="500" items-per-page="25" active-page="2" theme="${theme}"></p-pagination>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] }),
        {
          injectIntoHead: head,
        }
      );

      await forceHoverState(page, '.hover > p-pagination >>> span');

      await forceFocusState(page, '.focus > p-pagination >>> span');

      await forceFocusHoverState(page, '.focus-hover > p-pagination >>> span');
    })
  ).toBeFalsy();
});
