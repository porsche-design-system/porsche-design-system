import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'textarea-wrapper';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground > div { display: flex; }
      .playground > div > * { width: 40%; }
      p-textarea-wrapper:not(:last-child) {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
      textarea { min-height: initial; }
    </style>`;

  const child = '<textarea>Value</textarea>';
  const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
  const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');

  const markup = () => `
    <div>
      <p-textarea-wrapper label="Default">
        ${child}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Error" state="error" message="Error">
        ${child}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Success" state="success" message="Success">
        ${child}
      </p-textarea-wrapper>
    </div>
    <div>
      <p-textarea-wrapper label="Readonly">
        ${childReadonly}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Readonly Error" state="error" message="Error">
        ${childReadonly}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Readonly Success" state="success" message="Success">
        ${childReadonly}
      </p-textarea-wrapper>
    </div>
    <div>
      <p-textarea-wrapper label="Disabled">
        ${childDisabled}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Disabled Error" state="error" message="Error">
        ${childDisabled}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Disabled Success" state="success" message="Success">
        ${childDisabled}
      </p-textarea-wrapper>
    </div>
    <div>
      <p-textarea-wrapper>
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
      <p-textarea-wrapper label="Error" description="Some description" state="error">
        ${child}
        <span slot="message">
          Slotted error message
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Success" description="Some description" state="success">
        ${child}
        <span slot="message">
          Slotted success message
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
      </p-textarea-wrapper>
    </div>
    <div>
      <p-textarea-wrapper class="force-label" label="Default">
        ${child}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Error" state="error" message="Error">
        ${child}
      </p-textarea-wrapper>
      <p-textarea-wrapper label="Success" state="success" message="Success">
        ${child}
      </p-textarea-wrapper>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-textarea-wrapper:not(.force-label) textarea');
  await forceHoverState(page, '.hover p-textarea-wrapper.force-label >>> span');
  await forceHoverState(page, '.hover p-textarea-wrapper a');
  await forceFocusState(page, '.focus p-textarea-wrapper textarea');
  await forceFocusState(page, '.focus p-textarea-wrapper a');
  await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper:not(.force-label) textarea');
  await forceFocusState(page, '.focus-hover p-textarea-wrapper.force-label input');
  await forceHoverState(page, '.focus-hover p-textarea-wrapper.force-label >>> span');
  await forceFocusHoverState(page, '.focus-hover p-textarea-wrapper a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
