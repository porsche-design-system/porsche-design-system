import { expect, test } from '@playwright/test';
import {
  type GetMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  setContentWithDesignSystem,
  getBodyMarkup,
} from '../helpers';

const component = 'link-tile-model-signature';

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
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
          }
        </style>`;

      const image =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

      const getElementsMarkup: GetMarkup = () => `
        <div class="grid">
          <p-link-tile-model-signature heading="Some heading">
            ${image}
            <p-link slot="primary" href="#">Some Label</p-link>
            <p-link slot="secondary" href="#">Some Label</p-link>
          </p-link-tile-model-signature>
          <p-link-tile-model-signature heading="Some heading" description="Some description">
            <picture>
              ${image}
            </picture>
            <p-link slot="primary" href="#">Some Label</p-link>
            <p-link slot="secondary" href="#">Some Label</p-link>
           </p-link-tile-model-signature>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-link-tile-model-signature >>> .root');
      await forceHoverState(page, '.hover p-link-tile-model-signature p-link >>> .root');
      await forceHoverState(page, '.focus p-link-tile-model-signature >>> .root');
      await forceFocusState(page, '.focus p-link-tile-model-signature p-link >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile-model-signature >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-link-tile-model-signature p-link >>> .root');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
