import type { GetThemedMarkup } from '../helpers';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'scroller', '/#scroller')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('scroller-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-scroller theme="${theme}" active-tab-index="1">
          <button type="button">Button One</button>
          <button type="button">Button Two</button>
          <button type="button">Button Three</button>
          <button type="button">Button Four</button>
          <button type="button">Button Five</button>
          <button type="button">Button Six</button>
          <button type="button">Button Seven</button>
          <button type="button">Button Eight</button>
          <button type="button">Button Nine</button>
        </p-scroller>
        <p-scroller theme="${theme}" active-tab-index="1">
          <a href=="#">Anchor One</a>
          <a href=="#">Anchor Two</a>
          <a href=="#">Anchor Three</a>
          <a href=="#">Anchor Four</a>
          <a href=="#">Anchor Five</a>
          <a href=="#">Anchor Six</a>
          <a href=="#">Anchor Seven</a>
          <a href=="#">Anchor Eight</a>
          <a href=="#">Anchor Nine</a>
        </p-scroller>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] })
      );

      await forceHoverState(page, '.hover > p-scroller button');
      await forceHoverState(page, '.hover > p-scroller a');
      await forceFocusState(page, '.focus > p-scroller button');
      await forceFocusState(page, '.focus > p-scroller a');
      await forceFocusHoverState(page, '.focus-hover > p-scroller button');
      await forceFocusHoverState(page, '.focus-hover > p-scroller a');
    })
  ).toBeFalsy();
});
