import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
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
        getThemedBodyMarkup(getElementsMarkup, { theme: ['light', 'dark', 'light-electric'] })
      );

      await forceHoveredState(page, '.hovered > p-tabs-bar button');
      await forceHoveredState(page, '.hovered > p-tabs-bar a');
      await forceFocusedState(page, '.focused > p-tabs-bar button');
      await forceFocusedState(page, '.focused > p-tabs-bar a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-tabs-bar button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-tabs-bar a');
    })
  ).toBeFalsy();
});
