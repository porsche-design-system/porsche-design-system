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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'banner', '/#banner')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('banner-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style type="text/css">
          .playground { padding: 50px 0; }
          .playground p-banner { --p-banner-position-type: static; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner state="neutral" theme="${theme}">
          <span slot="title">Some banner title</span>
          <span slot="description">Some banner description. You can also add inline <a href="#">links</a> to route to another page.</span>
        </p-banner>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoveredState(page, '.hovered > p-banner span a');
      // TODO: support for 3rd level of shadow DOM is missing
      // await forceHoveredState(page, '.hovered > p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusedState(page, '.focused > p-banner span a');
      // await forceFocusedState(page, '.focused > p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusedHoveredState(page, '.focused-hovered > p-banner span a');
      // await forceFocusedHoveredState(page, '.focused-hovered > p-banner >>> p-inline-notification >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
