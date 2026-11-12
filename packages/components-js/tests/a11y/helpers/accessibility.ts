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

// messages a harness page under src/pages logs on purpose, by page name
export const harnessPageConsole: Record<string, RegExp[]> = {
  'button-pure': [
    /combination of properties icon='none' and loading='true' for component p-button-pure is not supported/,
  ],
  'link-tile-product': [/status of 404 \(Not Found\) http:\/\/localhost:8575\/nonexistent\.png$/],
  // modal-footer-scrolled.html renders a p-modal without heading, aria or header slot
  modal: [/aria prop or header slot has to be set for component p-modal/],
  'overview-components': [/component p-display is deprecated and will be removed with next major release/],
};
