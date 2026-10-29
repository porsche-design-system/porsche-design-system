import type { Locator } from '@playwright/test';

export const getProperty = async <T>(element: Locator, prop: string): Promise<T> => {
  return element.evaluate((el, prop: string) => (el as unknown as Record<string, T>)[prop], prop);
};

export const setProperty = async <T>(
  element: Locator,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => ((el as unknown as Record<string, unknown>)[key] = value), {
    key,
    value,
  });
};

export const getFormDataValue = async (form: Locator, name: string) => {
  return form.evaluate((el: HTMLFormElement, name: string) => {
    return new FormData(el).get(name);
  }, name);
};

export const getOuterHTML = (el: Locator): Promise<string> => el.evaluate((el) => el.outerHTML);
