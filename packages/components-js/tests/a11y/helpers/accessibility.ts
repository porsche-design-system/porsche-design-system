import type { Page } from '@playwright/test';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const componentsValid = (TAG_NAMES as unknown as TagName[])
  // Filter out non-chunked and not deprecated components
  .filter((tagName) => {
    const { isChunked, isDeprecated } = getComponentMeta(tagName);
    return isChunked && !isDeprecated;
  })
  .map((tagName) => {
    return tagName.substring(2);
  });

const isHydrated = (): boolean => {
  // matches prefixed tags like my-prefix-p-button too
  const pdsElements = Array.from(document.querySelectorAll('*')).filter((el) => /^(.*-)?P-/.test(el.tagName));
  // a page made of iframes has no components of its own
  const hasContent = pdsElements.length > 0 || document.querySelector('iframe') !== null;
  // main.js removes the demo app controls inside an iframe, axe scans that whole document
  const hasControlsInIFrame = window.self !== window.top && document.getElementById('controls') !== null;
  return (
    hasContent &&
    !hasControlsInIFrame &&
    document.querySelectorAll(':not(:defined)').length === 0 &&
    pdsElements.every((el) => el.classList.contains('hydrated'))
  );
};

// request routing slows page loads, so a scan waits until the components of every frame have rendered
export const waitForComponentsHydratedInFrames = async (page: Page): Promise<void> => {
  // the main frame first, its markup attaches the iframes
  await page.mainFrame().waitForFunction(isHydrated);
  for (const frame of page.frames()) {
    await frame.waitForFunction(isHydrated);
  }
};
