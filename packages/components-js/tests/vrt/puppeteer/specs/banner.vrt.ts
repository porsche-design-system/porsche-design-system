import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
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
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground p-banner { --p-banner-position-type: static; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner state="neutral" theme="${theme}">
          <span slot="title">
            Slotted title
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
          <span slot="description">
            Slotted description
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-banner>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-banner span a');
      // TODO: support for 3rd level of shadow DOM is missing
      // await forceHoveredState(page, '.hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-banner span a');
      // await forceFocusedState(page, '.focus p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-banner span a');
      // await forceFocusedHoveredState(page, '.focus-hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
    })
  ).toBeFalsy();
});
