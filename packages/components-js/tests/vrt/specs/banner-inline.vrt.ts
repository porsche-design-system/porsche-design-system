import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  extendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(extendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'banner-inline', '/#banner-inline')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('banner-inline-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner-inline theme="${theme}" action-label="Retry">
          <span slot="heading">Some slotted banner-inline title with a <a href="#">link</a>.</span>
          Some slotted banner-inline description with a <a href="#">link</a>.
        </p-banner-inline>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

      await forceHoveredState(page, '.hovered > p-banner-inline a');
      await forceHoveredState(page, '.hovered > p-banner-inline >>> p-button-pure >>> button');
      await forceFocusedState(page, '.focused > p-banner-inline a');
      await forceFocusedState(page, '.focused > p-banner-inline >>> p-button-pure >>> button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-banner-inline a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-banner-inline >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
