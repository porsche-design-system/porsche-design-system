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

const component = 'accordion';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const content = `Slotted content`;

      const head = `
        <style>
          #app { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground[title]::before { font: revert; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-accordion theme="${theme}" heading="Heading">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading" open="true">
          ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading" open="true">
          ${content}
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading (compact=true)" open="true" compact="true">
           ${content}
        </p-accordion>
        <p-accordion theme="${theme}" heading="Heading (compact=true)" open="true" compact="true">
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
          <br />
          <p-link-pure href="https://www.porsche.com" theme="${theme}">Some link</p-link-pure>
        </p-accordion>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-accordion >>> button');
      await forceHoverState(page, '.hover p-accordion > p-link-pure >>> a');
      await forceHoverState(page, '.hover p-accordion a');

      await forceFocusState(page, '.focus p-accordion >>> button');
      await forceFocusState(page, '.focus p-accordion > p-link-pure >>> a');
      await forceFocusState(page, '.focus p-accordion a');

      await forceFocusHoverState(page, '.focus-hover p-accordion >>> button');
      await forceFocusHoverState(page, '.focus-hover p-accordion > p-link-pure >>> a');
      await forceFocusHoverState(page, '.focus-hover p-accordion a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
