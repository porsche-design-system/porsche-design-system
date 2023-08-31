import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  type GetMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'select-wrapper';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      .playground > div {
        display: flex;
      }
      p-select-wrapper {
        width: 20rem;
      }
      p-select-wrapper:not(:last-child) {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    </style>`;

  type GetSelectMarkupOptions = { disabled?: boolean };
  const getSelectMarkup = (opts?: GetSelectMarkupOptions): string => `
<select${opts?.disabled ? ' disabled' : ''}>
  <option value="a">Option A</option>
</select>`;

  const getSlottedMarkup = (opts?: { disabled?: boolean }): string => `
<span slot="label">${
    opts?.disabled ? 'Disabled slotted' : 'Slotted'
  } label <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="description">Slotted description <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>
<span slot="message">Slotted message <span>and some slotted, deeply nested <a href="#">anchor</a>.</span></span>`;

  const disabledOptions: GetSelectMarkupOptions = { disabled: true };

  const getElementsMarkup: GetMarkup = () => `
    <div class="native">
      <p-select-wrapper label="Some native label" native>
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper label="Some native label" native state="error" message="Some error message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper label="Some native label" native state="success" message="Some success message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
    </div>
    <div>
      <p-select-wrapper label="Some dropdown label">
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper label="Some dropdown label" state="error" message="Some error message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper label="Some dropdown label" state="success" message="Some success message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
    </div>
    <div>
      <p-select-wrapper filter label="Some filter label">
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper filter label="Some filter label" state="error" message="Some error message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper filter label="Some filter label" state="success" message="Some success message.">
        ${getSelectMarkup()}
      </p-select-wrapper>
    </div>

    <div class="native">
      <p-select-wrapper label="Some disabled native label" native>
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper label="Some disabled native label" native state="error" message="Some error message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper label="Some disabled native label" native state="success" message="Some success message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
    </div>
    <div>
      <p-select-wrapper label="Some disabled dropdown label">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper label="Some disabled dropdown label" state="error" message="Some error message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper label="Some disabled dropdown label" state="success" message="Some success message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
    </div>
    <div>
      <p-select-wrapper filter label="Some disabled filter label">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper filter label="Some disabled filter label" state="error" message="Some error message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper filter label="Some disabled filter label" state="success" message="Some success message.">
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
    </div>

    <div>
      <p-select-wrapper>
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper state="error">
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select-wrapper>
      <p-select-wrapper state="success">
        ${getSlottedMarkup()}
        ${getSelectMarkup()}
      </p-select-wrapper>
    </div>
    <div>
      <p-select-wrapper>
        ${getSlottedMarkup(disabledOptions)}
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper state="error">
        ${getSlottedMarkup(disabledOptions)}
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
      <p-select-wrapper state="success">
        ${getSlottedMarkup(disabledOptions)}
        ${getSelectMarkup(disabledOptions)}
      </p-select-wrapper>
    </div>`;

  await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover .native p-select-wrapper select');
  await forceHoverState(page, '.hover p-select-wrapper span a');
  await forceHoverState(page, '.hover p-select-wrapper >>> p-select-wrapper-dropdown');
  await forceFocusState(page, '.focus .native p-select-wrapper select');
  await forceFocusState(page, '.focus p-select-wrapper span a');
  await forceFocusState(page, '.focus p-select-wrapper >>> p-select-wrapper-dropdown >>> button');
  await forceFocusState(page, '.focus p-select-wrapper >>> p-select-wrapper-dropdown >>> input');
  await forceFocusHoverState(page, '.focus-hover .native p-select-wrapper select');
  await forceFocusHoverState(page, '.focus-hover p-select-wrapper span a');
  // actual user interaction happens on multiple nodes that's why forceFocusedHoveredState is wrong
  await forceHoverState(page, '.focus-hover p-select-wrapper >>> p-select-wrapper-dropdown');
  await forceFocusState(page, '.focus-hover p-select-wrapper >>> p-select-wrapper-dropdown >>> button');
  await forceFocusState(page, '.focus-hover p-select-wrapper >>> p-select-wrapper-dropdown >>> input');
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
    test.skip(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
