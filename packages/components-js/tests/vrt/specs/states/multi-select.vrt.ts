import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'multi-select';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground div {
        display: flex;
      }
      p-multi-select {
        width: 20rem;
      }
      p-multi-select:not(:last-child) {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    </style>`;

  const getSelectMarkup = (): string => `
    <p-multi-select-option value="a">Option A</p-multi-select-option>`;

  const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
    <span slot="label">${opts?.disabled ? 'Disabled slotted' : 'Slotted'} label</span>
    <span slot="description">Slotted description</span>
    <span slot="message">Slotted message</span>`;

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

  await page
    .locator('.value p-multi-select')
    .evaluateAll(async (selects) => selects.forEach((select: any) => (select.value = ['a'])));

  await forceHoverState(page, '.hover p-multi-select >>> button');
  await forceHoverState(page, '.hover p-multi-select span a');

  await forceFocusVisibleState(page, '.focus p-multi-select span a');
  await forceFocusVisibleState(page, '.focus p-multi-select >>> button');

  await forceFocusHoverState(page, '.focus-hover p-multi-select >>> button');
  await forceFocusVisibleState(page, '.focus-hover p-multi-select >>> button');
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
