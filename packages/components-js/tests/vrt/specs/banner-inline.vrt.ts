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

      const head = `
        <style type="text/css">
          .playground { padding: 50px 0; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner-inline heading="Some banner title" state="neutral" theme="${theme}">
          Some banner description. You can also add inline <a href="#">links</a> to route to another page.
        </p-banner-inline>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoveredState(page, '.hovered > p-banner-inline a');
      await forceFocusedState(page, '.focused > p-banner-inline a');
      await forceFocusedHoveredState(page, '.focused-hovered > p-banner-inline a');
    })
  ).toBeFalsy();
});
