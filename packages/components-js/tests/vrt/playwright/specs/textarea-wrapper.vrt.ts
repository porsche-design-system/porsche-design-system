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
import { generateGUID } from '../../puppeteer/helpers';
import { Theme } from '@porsche-design-system/utilities-v2';
import { TAG_COLORS } from '@porsche-design-system/components/src/components/tag/tag-utils';

const component = 'textarea-wrapper';

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
          .playground[title]::before { font: revert; }
          .playground div { display: flex; }
          .playground div > * { width: 40%; }
          p-textarea-wrapper:not(:last-child) {
            margin-right: 1rem;
            margin-bottom: 1rem;
          }
          textarea { min-height: initial; }
        </style>`;

      const child = '<textarea>Value</textarea>';
      const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
      const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <div>
          <p-textarea-wrapper label="Default" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Error" state="error" message="Error" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Success" state="success" message="Success" theme="${theme}">
            ${child}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper label="Readonly" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Readonly Error" state="error" message="Error" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Readonly Success" state="success" message="Success" theme="${theme}">
            ${childReadonly}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper label="Disabled" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Disabled Error" state="error" message="Error" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Disabled Success" state="success" message="Success" theme="${theme}">
            ${childDisabled}
          </p-textarea-wrapper>
        </div>
        <div>
          <p-textarea-wrapper theme="${theme}">
            <span slot="label">
              Slotted label
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
            ${child}
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Error" description="Some description" state="error" theme="${theme}">
            ${child}
            <span slot="message">
              Slotted error message
              <span>
                and some slotted, deeply nested <a href="#">anchor</a>.
              </span>
            </span>
          </p-textarea-wrapper>
          <p-textarea-wrapper label="Success" description="Some description" state="success" theme="${theme}">
            ${child}
            <span slot="message">
              Slotted success message
              <span>
                and some slotted, deeply nested <a href="#">anchor</a>.
              </span>
            </span>
          </p-textarea-wrapper>
        </div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-textarea-wrapper textarea');
      await forceHoverState(page, '.hover p-textarea-wrapper a');
      await forceFocusState(page, '.focus p-textarea-wrapper textarea');
      await forceFocusState(page, '.focus p-textarea-wrapper a');
      await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper textarea');
      await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
