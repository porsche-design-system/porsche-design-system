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

const component = 'multi-select';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `<style>
        body { display: grid; grid-template-columns: repeat(2, 50%); }
        .playground div {
          display: flex;
        }
        p-multi-select {
          width: 9rem;
        }
        p-multi-select:not(:last-child) {
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
      </style>`;

  const getSelectMarkup = (): string => `
            <p-multi-select-option value="a">Option A</p-multi-select-option>`;

  const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
<span slot="label">${
    opts?.disabled ? 'Disabled slotted' : 'Slotted'
  } label <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="description">Slotted description <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="message">Slotted message <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>`;

  const markup = () => `
         <div class="value">
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div class="value">
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message." disabled>
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="error">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="success">
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
        </div>
        <div>
          <p-multi-select name="options" theme="${theme}" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="error" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
          <p-multi-select name="options" theme="${theme}" state="success" disabled>
            ${getSlottedMarkup()}
            ${getSelectMarkup()}
          </p-multi-select>
        </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await page.$$eval('.value p-multi-select', async (selects) =>
    selects.forEach((select: any) => (select.value = ['a']))
  );

  await forceHoverState(page, '.hover p-multi-select >>> .input-container');
  await forceHoverState(page, '.hover p-multi-select span a');
  await forceFocusState(page, '.focus p-multi-select span a');
  await forceFocusState(page, '.focus p-multi-select >>> input');
  await forceFocusHoverState(page, '.focus-hover p-multi-select >>> input');
  await forceFocusHoverState(page, '.focus-hover p-multi-select span a');
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
