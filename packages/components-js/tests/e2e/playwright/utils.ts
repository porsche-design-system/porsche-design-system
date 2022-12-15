import type { Page, ElementHandle } from '@playwright/test';

export const supportsDeclarativeShadowDOM = async (page: Page): Promise<boolean> => {
  return page.evaluate(() => HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot'));
};

export const waitForComponentsReady = async (page: Page): Promise<number> => {
  return page.evaluate((): Promise<number> => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.waitForTimeout(40); // TODO: remove timeout
};

export const setProperty = async <T>(
  element: ElementHandle,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value } as any);
};
