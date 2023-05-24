import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  furtherExtendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { Theme } from '@porsche-design-system/utilities-v2';

it.each(furtherExtendedViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'carousel', '/#carousel')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('carousel-states', async () => {
      const page = vrt.getPage();

      const head = `
        <style>
          body { display: grid; grid-template-columns: repeat(2, 50%); }
          p-carousel div {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #00b0f4;
            height: 100px;
          }
        </style>`;

      const slides = Array.from(Array(6))
        .map((_, i) => `<div>Slide ${i + 1}</div>`)
        .join('');

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-carousel theme="${theme}">
          <h2 slot="heading">
            Slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </h2>
          <p slot="description">
            Slotted description
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p>
          ${slides}
        </p-carousel>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-carousel >>> p-button-pure >>> button');
      await forceHoverState(page, '.hover p-carousel span a');
      await forceFocusState(page, '.focus p-carousel >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-carousel span a');
      await forceFocusHoverState(page, '.focus-hover p-carousel >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-carousel span a');
    })
  ).toBeFalsy();
});
