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

const component = 'link-pure';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
        #app { display: grid; grid-template-columns: repeat(2, 50%); }
        p-link-pure:not(:last-child) { margin-right: 16px; }
        #app div div:not(:first-of-type) { margin-top: 16px; }
        .playground[title]::before { font: revert; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div>
          <p-link-pure theme="${theme}" href="#">Label default</p-link-pure>
          <p-link-pure theme="${theme}"><a href="#">Label slotted</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" align-label="left" href="#">Label align left</p-link-pure>
          <p-link-pure theme="${theme}" align-label="left"><a href="#">Label slotted align left</a></p-link-pure>
          <p-link-pure theme="${theme}" align-label="left" icon="logo-delicious" href="#">Label align left</p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" hide-label="true" href="#">Without label</p-link-pure>
          <p-link-pure theme="${theme}" hide-label="true"><a href="#">Without label slotted</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" active="true" href="#">Label active</p-link-pure>
          <p-link-pure theme="${theme}" active="true"><a href="#">Label slotted active</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" icon="none" href="#">Label icon none</p-link-pure>
          <p-link-pure theme="${theme}" icon="none"><a href="#">Label slotted icon none</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" style="padding: 1rem" href="#">Label custom click-area</p-link-pure>
          <p-link-pure theme="${theme}" style="padding: 1rem" hide-label="true" href="#">Label custom click-area</p-link-pure>
          <p-link-pure theme="${theme}" style="padding: 1rem"><a href="#">Label slotted custom click-area</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" theme="${theme}" stretch="true" href="#">Label stretch</p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" theme="${theme}" stretch="true"><a href="#">Label slotted stretch</a></p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" align-label="left" stretch="true" href="#">Label stretch align left</p-link-pure>
        </div>
        <div>
          <p-link-pure theme="${theme}" align-label="left" stretch="true"><a href="#">Label slotted stretch align left</a></p-link-pure>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-link-pure[href] >>> a');
      await forceHoverState(page, '.hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
      await forceHoverState(page, '.hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
      await forceFocusState(page, '.focus p-link-pure'); // native outline should not be visible
      await forceFocusState(page, '.focus p-link-pure[href] >>> a');
      await forceFocusState(page, '.focus:not([href]) p-link-pure a');
      await forceFocusHoverState(page, '.focus-hover p-link-pure[href] >>> a');
      await forceFocusState(page, '.focus-hover p-link-pure:not([href]) a');
      await forceHoverState(page, '.focus-hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
      await forceHoverState(page, '.focus-hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
