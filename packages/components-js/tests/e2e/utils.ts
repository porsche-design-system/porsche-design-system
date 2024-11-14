import type { Locator, Page } from '@playwright/test';

export const supportsDeclarativeShadowDOM = async (page: Page): Promise<boolean> => {
  return page.evaluate(
    () =>
      // biome-ignore lint/suspicious/noPrototypeBuiltins: ok
      HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot') ||
      // biome-ignore lint/suspicious/noPrototypeBuiltins: ok
      HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')
  );
};

export const waitForComponentsReady = (page: Page): Promise<number> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.waitForTimeout(40); // TODO: remove timeout
};

export const setProperty = async <T>(
  element: Locator,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value } as any);
};
