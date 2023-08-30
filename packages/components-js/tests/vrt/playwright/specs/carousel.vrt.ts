import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'carousel';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `
        <style>
          #app { display: grid; grid-template-columns: repeat(2, 50%); }
          p-carousel div {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #00b0f4;
            height: 100px;
          }
          .playground[title]::before { font: revert; }
        </style>`;

      const slides = Array.from(Array(6))
        .map((_, i) => `<div>Slide ${i + 1}</div>`)
        .join('');

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-carousel theme="${theme}" skip-link-target="#target">
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
      await forceFocusState(page, '.hover p-carousel >>> p-link-pure'); // to make it appear via :focus
      await forceHoverState(page, '.hover p-carousel >>> p-link-pure >>> a');
      await forceHoverState(page, '.hover p-carousel span a');
      await forceFocusState(page, '.focus p-carousel >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-carousel >>> p-link-pure'); // to make it appear via :focus
      await forceFocusState(page, '.focus p-carousel >>> p-link-pure >>> a');
      await forceFocusState(page, '.focus p-carousel span a');
      await forceFocusState(page, '.focus p-carousel >>> .splide__slide'); // TODO: make this work 🤷‍
      await forceFocusHoverState(page, '.focus-hover p-carousel >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus-hover p-carousel >>> p-link-pure'); // to make it appear via :focus
      await forceFocusHoverState(page, '.focus-hover p-carousel >>> p-link-pure >>> a');
      await forceFocusHoverState(page, '.focus-hover p-carousel span a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
