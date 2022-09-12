import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'scroller', '/#scroller')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('scroller-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) =>
        `<div style="max-width: 400px">
  <p-scroller theme="${theme}" style="white-space: nowrap; line-height: 1.5">
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-scroller>
</div>`;

      await setContentWithDesignSystem(
        page,
        getThemedBodyMarkup(getElementsMarkup, { themes: ['light', 'dark', 'light-electric'] })
      );

      // Scroll a bit to ensure both arrows are visible
      await page.evaluate(() =>
        document
          .querySelectorAll('p-scroller')
          .forEach((scroller) => ((scroller as any).scrollToPosition = { scrollPosition: 100 }))
      );

      await forceHoverState(page, '.hover p-scroller >>> p-button-pure >>> button'); // Scroll indicator hover
      await forceFocusState(page, '.focus p-scroller >>> .scroll-wrapper');
      await forceHoverState(page, '.focus-hover p-scroller >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus-hover p-scroller >>> .scroll-wrapper');
    })
  ).toBeFalsy();
});
