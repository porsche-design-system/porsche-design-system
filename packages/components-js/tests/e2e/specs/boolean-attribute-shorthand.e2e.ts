import { expect, test } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import type { Page } from 'playwright';
import {
  buildDefaultComponentMarkup,
  getConsoleErrorMessages,
  getConsoleErrorsAmount,
  initConsoleObserver,
  setContentWithDesignSystem,
} from '../helpers';

const toKebabCase = (str: string): string => str.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

// Stencil resolves BreakpointCustomizable<boolean> props to "any" and therefore skips its own boolean attribute
// coercion, so the empty string has to be handled by the Porsche Design System itself
const breakpointCustomizableBooleanProps: [TagName, string][] = TAG_NAMES.flatMap((tagName) =>
  Object.entries(getComponentMeta(tagName).propsMeta ?? {})
    .filter(
      ([, { isBreakpointCustomizable, allowedValues }]) => isBreakpointCustomizable && allowedValues === 'boolean'
    )
    .map(([propName]): [TagName, string] => [tagName, propName])
);

const buildMarkup = (tagName: TagName, propName: string, value: string | undefined, id: string): string => {
  const attributeName = toKebabCase(propName);
  const attribute = value === undefined ? attributeName : `${attributeName}="${value}"`;
  return buildDefaultComponentMarkup(tagName).replace(`<${tagName}`, `<${tagName} id="${id}" ${attribute}`);
};

const getComponentCss = (page: Page, id: string): Promise<string> =>
  page.locator(`#${id}`).evaluate((el) =>
    Array.from(el.shadowRoot.adoptedStyleSheets)
      .map((sheet) =>
        Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('')
      )
      .join('')
  );

const getLabelWrapperWidth = async (page: Page, id: string): Promise<number> => {
  const boundingBox = await page.locator(`#${id} .label-wrapper`).boundingBox();
  if (!boundingBox) {
    throw new Error(`Label wrapper of #${id} is not rendered`);
  }
  return boundingBox.width;
};

test.describe('boolean attribute shorthand', () => {
  for (const [tagName, propName] of breakpointCustomizableBooleanProps) {
    const attributeName = toKebabCase(propName);

    test(`should treat "${attributeName}" on ${tagName} like "${attributeName}='true'"`, async ({ page }) => {
      initConsoleObserver(page);

      await setContentWithDesignSystem(
        page,
        [
          buildMarkup(tagName, propName, undefined, 'shorthand'),
          buildMarkup(tagName, propName, 'true', 'explicit-true'),
        ].join('')
      );

      expect(await getComponentCss(page, 'shorthand')).toBe(await getComponentCss(page, 'explicit-true'));
      expect(getConsoleErrorsAmount(), getConsoleErrorMessages()).toBe(0);
    });
  }

  test('should visually hide the label of p-input-text', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      [
        '<p-input-text id="shorthand" name="shorthand" label="Some label" hide-label></p-input-text>',
        '<p-input-text id="omitted" name="omitted" label="Some label"></p-input-text>',
      ].join('')
    );

    const shorthand = await getLabelWrapperWidth(page, 'shorthand');
    const omitted = await getLabelWrapperWidth(page, 'omitted');

    expect(shorthand).toBeLessThan(omitted);
  });
});
