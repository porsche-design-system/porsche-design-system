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

const component = 'text-field-wrapper';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground div, .playground form {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
      }
    </style>`;

  const child = '<input type="text" value="Value" />';
  const childReadonly = child.replace(/((?: \/)?>)/, ' readonly$1');
  const childDisabled = child.replace(/((?: \/)?>)/, ' disabled$1');

  const markup = () => `
    <div>
      <p-text-field-wrapper label="Text empty">
        <input type="text" />
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Password empty">
        <input type="password" />
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Search empty">
        <input type="search" />
      </p-text-field-wrapper>
    </div>
    <form>
      <p-text-field-wrapper label="Text in form">
        ${child}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Password in form">
        <input type="password" value="Value" />
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Search in form">
        <input type="search" value="Value" />
      </p-text-field-wrapper>
    </form>
    <div>
      <p-text-field-wrapper label="Default">
        ${child}
      </p-text-field-wrapper>
      <p-text-field-wrapper class="toggle-password" label="Password">
        <input type="password" value="Value" />
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Search">
        <input type="search" value="Value" />
      </p-text-field-wrapper>
    </div>
    <div>
      <p-text-field-wrapper label="Default">
        ${child}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Error" state="error" message="Error">
        ${child}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Success" state="success" message="Success">
        ${child}
      </p-text-field-wrapper>
    </div>
    <div>
      <p-text-field-wrapper label="Readonly">
        ${childReadonly}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Readonly Error" state="error" message="Error">
        ${childReadonly}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Readonly Success" state="success" message="Success">
        ${childReadonly}
      </p-text-field-wrapper>
    </div>
    <div>
      <p-text-field-wrapper label="Disabled">
        ${childDisabled}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Disabled Error" state="error" message="Error">
        ${childDisabled}
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Disabled Success" state="success" message="Success">
        ${childDisabled}
      </p-text-field-wrapper>
    </div>
    <div>
      <p-text-field-wrapper>
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
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Error" description="Some description" state="error">
        ${child}
        <span slot="message">
          Slotted error message
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Success" description="Some description" state="success">
        ${child}
        <span slot="message">
          Slotted success message
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </span>
      </p-text-field-wrapper>
    </div>
    <div>
      <p-text-field-wrapper class="force-label" label="Label gets hovered or focussed">
        <input type="text" />
      </p-text-field-wrapper>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // let's toggle some password fields
  const textFieldWrappers = await page.$$('.toggle-password');
  await Promise.all(
    textFieldWrappers.map(
      async (item) =>
        (
          await item.evaluateHandle((el) => el.shadowRoot.querySelector('p-button-pure'))
        ).evaluate((el: HTMLElement) => el.click()) // js element.click() instead of puppeteer ElementHandle.click() to workaround element off screen issue
    )
  );

  // get rid of focus from last .toggle-password input
  await page.mouse.click(0, 0);

  await forceHoverState(page, '.hover p-text-field-wrapper:not(.force-label) input');
  await forceHoverState(page, '.hover p-text-field-wrapper.force-label >>> span');
  await forceHoverState(page, '.hover p-text-field-wrapper a');
  await forceHoverState(page, '.hover p-text-field-wrapper >>> p-button-pure >>> button');
  await forceFocusState(page, '.focus p-text-field-wrapper input');
  await forceFocusState(page, '.focus p-text-field-wrapper a');
  await forceFocusState(page, '.focus p-text-field-wrapper >>> p-button-pure >>> button');
  await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper:not(.force-label) input');
  await forceFocusState(page, '.focus-hover p-text-field-wrapper.force-label input');
  await forceHoverState(page, '.focus-hover p-text-field-wrapper.force-label >>> span');
  await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper a');
  await forceFocusHoverState(page, '.focus-hover p-text-field-wrapper >>> p-button-pure >>> button');
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
