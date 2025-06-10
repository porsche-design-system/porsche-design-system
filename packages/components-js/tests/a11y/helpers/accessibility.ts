import type { Page } from '@playwright/test';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const isElementAtIndexFocused = async (page: Page, elementIndex: number): Promise<boolean> => {
  const snapshot = await page.accessibility.snapshot();
  const element = snapshot!.children![elementIndex];
  return element.focused || false;
};

export const componentsValid = (TAG_NAMES as unknown as TagName[])
  // Filter out non-chunked and not deprecated components
  .filter((tagName) => {
    const { isChunked, isDeprecated } = getComponentMeta(tagName);
    return isChunked && !isDeprecated;
  })
  .map((tagName) => {
    return tagName.substring(2);
  });
