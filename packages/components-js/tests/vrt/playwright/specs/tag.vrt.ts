import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import { Theme } from '@porsche-design-system/utilities-v2';
import { TAG_COLORS } from '@porsche-design-system/components/src/components/tag/tag-utils';

const component = 'tag';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
        p-tag:not(:last-child) { margin-right: 0.5rem; }
        .row:not(:last-child) { margin-bottom: 0.5rem; }
      </style>`;

      const getColorVariations = (theme: Theme, child: string): string =>
        [TAG_COLORS[0], ...TAG_COLORS]
          .map((color, i) => `<p-tag theme="${theme}" color="${color}"${i === 0 ? 'icon="car"' : ''}>${child}</p-tag>`)
          .join('\n');

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div class="row">
          ${getColorVariations(theme, 'Text')}
        </div>
        <div class="row">
          ${getColorVariations(theme, '<a href="#">Link</a>')}
        </div>
        <div class="row">
          ${getColorVariations(theme, '<button>Button</button>')}
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tag >>> span');
      await forceHoverState(page, '.hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.
      await forceFocusState(page, '.focus p-tag a');
      await forceFocusState(page, '.focus p-tag button');
      await forceFocusState(page, '.focus-hover p-tag a');
      await forceFocusState(page, '.focus-hover p-tag button');
      await forceHoverState(page, '.focus-hover p-tag >>> span');
      await forceHoverState(page, '.focus-hover p-tag button');
      await forceHoverState(page, '.focus-hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
