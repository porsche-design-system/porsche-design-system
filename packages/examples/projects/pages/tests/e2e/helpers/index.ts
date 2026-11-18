import type { Locator, Page } from '@playwright/test';
import { waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';

export {
  getDevice,
  getExampleUrl,
  getSpecPath,
  waitForStablePosition,
  youtubePlayerStub,
} from '../../helpers/index.ts';

/**
 * What an end-to-end test of an example needs, which is deliberately less than a screenshot needs.
 *
 * The VRT's `setupExamplePage()` also freezes every video, releases the focus a page took on load and waits for the
 * layout to stop moving. All three are wrong here: the video is the thing under test on the pages that have one, the
 * focus a flow moves is exactly what is asserted, and a behaviour test should not wait for a stable *picture*.
 *
 * What both share is waiting until the components have actually upgraded, because everything an example wires up hangs
 * off `p-*` elements. The shared `test` routes the external origins for both, including the CDN the loader builds its
 * URL for at runtime.
 */

/** Height of the viewport when a test sets the width itself, for the flows that resize the page. */
export const defaultViewportHeight = 800;

/**
 * Opens an example page and waits until its components are usable.
 *
 * The page is laid out on the viewport of the device its project emulates – see `playwright.config.ts`. Only a flow
 * about resizing passes a width of its own.
 */
export const setupExamplePage = async (page: Page, url: string, viewportWidth?: number): Promise<void> => {
  if (viewportWidth) {
    await page.setViewportSize({ width: viewportWidth, height: defaultViewportHeight });
  }
  await page.goto(url);
  await waitForComponentsHydrated(page);
};

/**
 * The control a trigger renders inside its shadow root, which is what carries `aria-expanded`.
 *
 * The examples set the state through the `aria` **prop** of the component (`button.aria = { 'aria-expanded': … }`),
 * and the component renders it onto its own control rather than reflecting it onto the host – so asserting on the
 * host would always find nothing. Going through the shadow control is what a screen reader actually gets, which is
 * the point of mirroring the state at all.
 */
export const getTriggerControl = (page: Page, id: string): Locator => page.locator(`#${id} button`);

/**
 * The `open` state of a disclosure used in controlled mode.
 *
 * Read as a **property**: the page sets `element.open`, and none of these components reflects that to an attribute.
 * The initial state is the trap – a step the markup renders open carries a real `open=""` attribute that never goes
 * away, so an attribute-based check keeps reporting the first step as open for the rest of the tour.
 */
export const isOpen = (locator: Locator): Promise<boolean> =>
  locator.evaluate((element: HTMLElement & { open?: boolean }) => element.open === true);
