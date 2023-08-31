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
  getBodyMarkup,
  type GetMarkup,
} from '../helpers';

const component = 'link-tile';

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
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 1rem;
          }
        </style>`;

      const image =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

      const getElementsMarkup: GetMarkup = () => `
        <div class="grid">
          <p-link-tile href="#" label="Some Label" description="Default">
           ${image}
          </p-link-tile>
          <p-link-tile href="#" label="Some Label" description="Compact" compact="true">
           ${image}
          </p-link-tile>
          <p-link-tile href="#" label="Some Label" description="Picture tag" compact="true">
            <picture>
             ${image}
            </picture>
          </p-link-tile>
        </div>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-link-tile >>> .root');
      await forceHoverState(page, '.hover p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.hover p-link-tile >>> p-link-pure >>> .root');
      await forceFocusState(page, '.focus p-link-tile >>> p-link >>> .root');
      await forceFocusState(page, '.focus p-link-tile >>> p-link-pure >>> .root');
      await forceFocusState(page, '.focus p-link-tile >>> a');
      await forceHoverState(page, '.focus-hover p-link-tile >>> p-link >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile >>> p-link-pure >>> .root');
      await forceHoverState(page, '.focus-hover p-link-tile >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-link-tile >>> p-link >>> .root');
      await forceFocusHoverState(page, '.focus-hover p-link-tile >>> p-link-pure >>> .root');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
