import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'select';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground div {
        display: flex;
      }
      p-select {
        width: 20rem;
      }
      p-select:not(:last-child) {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    </style>`;

  const getSelectMarkup = (): string => `
    <p-select-option value="a">Option A</p-select-option>`;

  const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
    <span slot="label">${
      opts?.disabled ? 'Disabled slotted' : 'Slotted'
    } label <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
    <span slot="description">Slotted description <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
    <span slot="message">Slotted message <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>`;

  const markup = () => `
    <div>
      <p-select name="options" value="a" theme="${theme}" label="Some dropdown label">
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" value="a" theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" value="a" theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
        ${getSelectMarkup()}
      </p-select>
    </div>
    <div>
      <p-select name="options" theme="${theme}" label="Some dropdown label">
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" label="Some dropdown label" state="error" message="Some error message.">
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" label="Some dropdown label" state="success" message="Some success message.">
        ${getSelectMarkup()}
      </p-select>
    </div>
    <div>
      <p-select name="options" value="a" theme="${theme}" label="Some disabled dropdown label" disabled>
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" value="a" theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message." disabled>
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" value="a" theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message." disabled>
        ${getSelectMarkup()}
      </p-select>
    </div>
    <div>
      <p-select name="options" theme="${theme}" label="Some disabled dropdown label" disabled>
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" label="Some disabled dropdown label" state="error" message="Some error message." disabled>
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" label="Some disabled dropdown label" state="success" message="Some success message." disabled>
        ${getSelectMarkup()}
      </p-select>
    </div>
    <div>
      <p-select name="options" theme="${theme}">
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" state="error">
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" state="success">
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
    </div>
    <div>
      <p-select name="options" theme="${theme}" disabled>
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" state="error" disabled>
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
      <p-select name="options" theme="${theme}" state="success" disabled>
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await page.$$eval('.value p-multi-select', async (selects) =>
    selects.forEach((select: any) => (select.value = ['a']))
  );

  await forceHoverState(page, '.hover p-multi-select >>> input');
  await forceHoverState(page, '.hover p-multi-select span a');
  await forceFocusState(page, '.focus p-multi-select span a');
  await forceFocusState(page, '.focus p-multi-select >>> input');
  await forceFocusHoverState(page, '.focus-hover p-multi-select >>> input');
  await forceFocusHoverState(page, '.focus-hover p-multi-select span a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${theme}.png`);
    });
  });

  schemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });
  });
});
