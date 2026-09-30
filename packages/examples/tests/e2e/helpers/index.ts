import { type ConsoleMessage, expect, type Locator, type Page } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';
import { stubExternalRequests, waitForComponentsReady } from '../../vrt/helpers/index.ts';

/**
 * What an end-to-end test of an example needs, which is deliberately less than a screenshot needs.
 *
 * The VRT's `setupExamplePage()` also freezes every video, releases the focus a page took on load and waits for the
 * layout to stop moving. All three are wrong here: the video is the thing under test on the pages that have one, the
 * focus a flow moves is exactly what is asserted, and a behaviour test should not wait for a stable *picture*.
 *
 * What both share is the part that makes a run hermetic – the external origins, including the CDN the loader builds
 * its URL for at runtime – and waiting until the components have actually upgraded, because everything an example
 * wires up hangs off `p-*` elements.
 */

export const defaultViewportHeight = 800;

/** Opens an example page and waits until its components are usable. */
export const setupExamplePage = async (
  page: Page,
  url: string,
  viewportWidth: number = viewportWidthM
): Promise<void> => {
  await stubExternalRequests(page);
  await page.setViewportSize({ width: viewportWidth, height: defaultViewportHeight });
  await page.goto(url);
  await waitForComponentsReady(page);
};

/**
 * Collects everything the page reports as broken: `console.error` and uncaught exceptions.
 *
 * This is the cheapest check there is for these examples and it covers their most likely failure. The behaviour of a
 * page is a plain script wired on ids, inlined by the build – so a renamed element, a snippet that ends up in a page
 * it was not written for, or a `main.js` that throws on load all fail silently in the browser. The page still
 * renders, the VRT still matches, and nothing works.
 *
 * Must be installed **before** the navigation, since most of it happens while the page loads.
 */
export const collectPageErrors = (page: Page): string[] => {
  const errors: string[] = [];

  page.on('console', (message: ConsoleMessage) => {
    if (message.type() === 'error') {
      errors.push(`console.error: ${message.text()}`);
    }
  });
  page.on('pageerror', (error: Error) => {
    errors.push(`uncaught: ${error.message}`);
  });

  return errors;
};

/** Whether a page renders a given element at all – the flows are keyed off this, not off a list of page names. */
export const hasElement = async (page: Page, selector: string): Promise<boolean> =>
  (await page.locator(selector).count()) > 0;

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

/**
 * Waits until an element has stopped moving.
 *
 * A popover is positioned *after* it opens, and the `open` property flips before that has happened. Clicking in
 * between lands on whatever is still underneath — and for a coachmark anchored over the page that is an outside
 * click, which dismisses the very tour the test was about to walk. Playwright's own actionability cannot save this:
 * by the time it retries, the step is gone.
 *
 * `p-popover` emits only `dismiss`, so there is no "finished opening" event to await and the settled box is the
 * signal: two consecutive frames reporting the same position, with a real size.
 */
export const waitForStablePosition = async (locator: Locator): Promise<void> => {
  await expect
    .poll(async () => {
      const before = await locator.boundingBox();
      await locator
        .page()
        .evaluate(
          () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
        );
      const after = await locator.boundingBox();

      return !!before && !!after && before.x === after.x && before.y === after.y && after.width > 0;
    })
    .toBe(true);
};
