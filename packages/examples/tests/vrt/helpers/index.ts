import type { Page } from '@playwright/test';

/**
 * What a VRT capture of an example needs before the screenshot is taken.
 *
 * The examples are static pages served from the built projects, so there is no application state to drive – what has
 * to be pinned down is everything that can differ between two runs: the components have to be upgraded, the fonts
 * loaded, the hero video parked on a fixed frame and whatever the page focused on load released again.
 */

/** Height of the viewport for every capture. The screenshots are full page, so this only fixes the `vh` units. */
export const viewportHeight = 600;

export type ColorScheme = 'light' | 'dark';

export type ExampleScenarioOptions = {
  /** Windows High Contrast Mode. */
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: ColorScheme;
  /** 200% text zoom – goes through CDP and is therefore chromium only. */
  scalePageFontSize?: boolean;
  /** Right-to-left reading direction. The examples never set `dir` themselves, so the test does. */
  rtl?: boolean;
};

/**
 * A placeholder for the images an example loads from a third party.
 *
 * The footer shows the logos of three payment providers, hosted on a content delivery network of Porsche. They are
 * the only requests of an example that leave the machine, and a VRT run must not depend on them: an offline or slow
 * network would change the layout instead of failing the request visibly. The stub keeps a fixed size, so what the
 * baseline records is the layout of the page, not the availability of a third party.
 */
const externalImageStub = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40" viewBox="0 0 64 40"><rect width="64" height="40" rx="4" fill="#C8CACB"/></svg>`;

/** Everything outside the preview server and the local CDN is answered by the test, not by the network. */
const stubExternalRequests = async (page: Page): Promise<void> => {
  await page.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, async (route) => {
    if (route.request().resourceType() === 'image') {
      await route.fulfill({ contentType: 'image/svg+xml', body: externalImageStub });
    } else {
      await route.abort();
    }
  });
};

/**
 * Waits until every Porsche Design System element of the page has upgraded.
 *
 * The examples load the components through the **loader partial**, which deliberately ships no `componentsReady()` –
 * that helper belongs to the JS wrapper the other packages test against. What the page offers instead is what the
 * components themselves put into the DOM: a custom element is registered (`:defined`) and Stencil marks the upgraded
 * element with the `hydrated` class. Both have to hold, because `assets/styles.css` hides undefined elements and an
 * element without that class has not rendered its shadow root yet.
 */
export const waitForComponentsReady = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => {
    const pdsElements = Array.from(document.querySelectorAll('*')).filter((element) =>
      element.tagName.startsWith('P-')
    );

    return (
      document.querySelectorAll(':not(:defined)').length === 0 &&
      pdsElements.every((element) => element.classList.contains('hydrated'))
    );
  });
};

/**
 * Parks every video on its poster frame.
 *
 * `prefers-reduced-motion` already makes the hero video of an example stop itself (see `src/assets/video.js`), but it
 * may have played a few frames before the script ran, and which frame a paused video shows differs between the
 * engines. `load()` aborts the playback and restores the poster, which is the one frame a video renders identically
 * everywhere – so that is what the baseline records.
 */
const freezeVideos = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    for (const video of Array.from(document.querySelectorAll('video'))) {
      video.removeAttribute('autoplay');
      video.autoplay = false;
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  });

  await page.waitForFunction(() => Array.from(document.querySelectorAll('video')).every((video) => video.paused));
};

/**
 * Releases the focus a page took on load.
 *
 * Some patterns open a disclosure right away (the local market switch, the feature tour), and an overlay moves focus
 * into itself – a focus ring is a state of its own and does not belong into the baseline of the initial state. The
 * active element is followed through the shadow roots, because `document.activeElement` only ever names the host.
 *
 * Clicking the page instead would work as well, but it would close the very disclosure the pattern is about.
 */
const blurActiveElement = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    let element: Element | null = document.activeElement;

    while (element && element !== document.body) {
      const inner: Element | null = (element as HTMLElement).shadowRoot?.activeElement ?? null;
      (element as HTMLElement).blur?.();
      element = inner;
    }
  });
};

/**
 * Waits for the fonts the examples are laid out in.
 *
 * `document.fonts.ready` only settles the loads that have already started, and the Porsche Design System fonts are
 * brought in by a partial as a `<link rel="preload">`, which registers no font face. A page can therefore be "ready"
 * while still being laid out in the fallback font – and a line that wraps in one metric and not in the other makes
 * the page 34px taller in one run than in the next. Requesting the faces explicitly removes that race.
 */
const waitForFonts = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    await Promise.all(['400 1rem "Porsche Next"', '600 1rem "Porsche Next"'].map((font) => document.fonts.load(font)));
    await document.fonts.ready;
  });
};

/**
 * Makes every self-measuring component measure again, with the final fonts and font size in place.
 *
 * The tabs bar of the stacked header decides on its scroll affordances from the width of its content, and that
 * decision is taken once, whenever its observers happen to run. At 200% font size the two possible outcomes differ by
 * the height of the affordance – a page that is 34px taller in one run than in the next. Nudging the viewport by a
 * pixel and back triggers every `ResizeObserver` after everything else has settled, so the run always ends in the
 * state the final layout calls for.
 */
const remeasureComponents = async (page: Page, viewportWidth: number): Promise<void> => {
  await page.setViewportSize({ width: viewportWidth - 1, height: viewportHeight });
  await page.setViewportSize({ width: viewportWidth, height: viewportHeight });
};

/**
 * Waits until the page stops changing its own height.
 *
 * Components that measure themselves relayout after they have rendered – the tabs bar of the stacked header decides
 * on its scroll affordances that way, and at 200% font size that decision changes the height of the page. Screenshot
 * comparison is stable per capture, but the height a run settles on has to be stable across runs, so the capture
 * waits for two consecutive frames reporting the same height.
 */
const waitForStableLayout = async (page: Page): Promise<void> => {
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        const height = document.documentElement.scrollHeight;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => resolve(document.documentElement.scrollHeight === height))
        );
      })
  );
};

/**
 * Opens an example page and brings it into the state a screenshot may be taken in.
 *
 * The order matters: everything emulated has to be in place before the navigation, so the page is rendered once and
 * with the final conditions – a scheme or a font size applied afterwards would relayout what has already been
 * measured by the components.
 */
export const setupExamplePage = async (
  page: Page,
  url: string,
  viewportWidth: number,
  options: ExampleScenarioOptions = {}
): Promise<void> => {
  const { forcedColorsEnabled, prefersColorScheme, scalePageFontSize, rtl } = options;

  await stubExternalRequests(page);
  await page.setViewportSize({ width: viewportWidth, height: viewportHeight });

  // Reduced motion is not a variant, it is a precondition of every capture: it stops the autoplaying hero video and
  // the transitions of the components, both of which would otherwise be timing dependent.
  await page.emulateMedia({
    forcedColors: forcedColorsEnabled ? 'active' : 'none',
    colorScheme: prefersColorScheme ?? 'light',
    reducedMotion: 'reduce',
  });

  if (scalePageFontSize) {
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Page.setFontSizes', {
      fontSizes: {
        standard: 32,
        fixed: 48,
      },
    });
  }

  if (rtl) {
    // An init script rather than an evaluation after the load: the components read the direction when they upgrade.
    await page.addInitScript(() => {
      const setDirection = () => document.documentElement.setAttribute('dir', 'rtl');

      if (document.documentElement) {
        setDirection();
      } else {
        document.addEventListener('DOMContentLoaded', setDirection, { once: true });
      }
    });
  }

  await page.goto(url);

  await waitForComponentsReady(page);
  await waitForFonts(page);
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  await freezeVideos(page);
  await blurActiveElement(page);
  await remeasureComponents(page, viewportWidth);
  await waitForStableLayout(page);
};
