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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'tabs-bar', '/#tabs-bar')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('tabs-bar-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <button type="button">Button Tab One</button>
          <button type="button">Button Tab Two</button>
          <button type="button">Button Tab Three</button>
        </p-tabs-bar>
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <a href="#">Anchor Tab One</a>
          <a href="#">Anchor Tab Two</a>
          <a href="#">Anchor Tab Three</a>
        </p-tabs-bar>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] })
      );

      await forceHoverState(page, '.hover > p-tabs-bar button');
      await forceHoverState(page, '.hover > p-tabs-bar a');
      await forceFocusState(page, '.focus > p-tabs-bar button');
      await forceFocusState(page, '.focus > p-tabs-bar a');
      await forceFocusHoverState(page, '.focus-hover > p-tabs-bar button');
      await forceFocusHoverState(page, '.focus-hover > p-tabs-bar a');
    })
  ).toBeFalsy();
});
