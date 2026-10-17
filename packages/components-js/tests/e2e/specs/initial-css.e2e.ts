import { expect, type Page, test } from '@playwright/test';
import {
  getElementStyle,
  setContentWithDesignSystem,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';

// Checks the built `initial.css` (`packages/components/projects/stylesheets/lib/initial.css`, copied to
// `public/assets/initial.css` by `build-app:stylesheets`) in a real browser: the closed overlays take no space until
// they are defined, and neither they nor their slotted content flash up while the components are being defined.
//
// The page is rendered without the `load()` call, so every component stays undefined until a test calls it. The demo
// app's `style.css` with its bare `:not(:defined) { visibility: hidden }` is not part of this page. With that legacy
// rule instead of `initial.css`, a closed overlay keeps its slotted content in the flow (the gap between its siblings
// is not 0) and the `aria-live` region of `<next-route-announcer>` inherits `visibility: hidden`.

const INITIAL_CSS = '<link rel="stylesheet" href="assets/initial.css">';

// Mirrors `INITIAL_CLOSED_OVERLAY_TAG_NAMES` of `initial.ts`.
const overlayTagNames = ['p-drilldown', 'p-flyout', 'p-modal', 'p-sheet'] as const;
type OverlayTagName = (typeof overlayTagNames)[number];

type InitialState = {
  hostDefined: boolean;
  hostDisplay: string;
  contentVisible: boolean;
  dialogVisible: boolean;
  gap: number;
  afterTop: number;
};

type RecorderWindow = Window & {
  stopInitialStateRecording?: () => InitialState[];
};

const getContentMarkup = (tagName: OverlayTagName): string =>
  tagName === 'p-drilldown'
    ? '<p-drilldown-item identifier="item-1" label="Item 1"><div id="content">Some Content</div></p-drilldown-item>'
    : '<div id="content">Some Content</div>';

const initOverlay = (page: Page, tagName: OverlayTagName, opts: { isOpen: boolean }): Promise<void> => {
  const attributes = [
    'id="overlay"',
    opts.isOpen && 'open',
    // the slotted content of `p-drilldown` is only rendered for the active item
    tagName === 'p-drilldown' && 'active-identifier="item-1"',
  ]
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `<div id="before" style="height: 40px"></div>
<${tagName} ${attributes}>${getContentMarkup(tagName)}</${tagName}>
<div id="after" style="height: 40px"></div>`,
    { injectIntoHead: INITIAL_CSS, withoutLoadCall: true, withoutWaitForComponentsReady: true }
  );
};

const loadDesignSystem = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    const el = document.createElement('script');
    el.textContent = 'porscheDesignSystem.load()';
    document.body.append(el);
  });
  await waitForComponentsReady(page);
  await waitForStencilLifecycle(page);
};

const getRect = (page: Page, selector: string): Promise<{ width: number; height: number }> =>
  page.locator(selector).evaluate((el) => {
    const { width, height } = el.getBoundingClientRect();
    return { width, height };
  });

const getGapBetweenSiblings = (page: Page): Promise<number> =>
  page.evaluate(() => {
    const before = document.querySelector('#before') as HTMLElement;
    const after = document.querySelector('#after') as HTMLElement;
    return after.getBoundingClientRect().top - before.getBoundingClientRect().bottom;
  });

const isDefined = (page: Page, selector: string): Promise<boolean> =>
  page.locator(selector).evaluate((el) => el.matches(':defined'));

// Records the state on every animation frame, on every mutation of the light and shadow DOM and on every size change
// (ResizeObserver callbacks run after layout and right before paint), so a state that is painted for a single frame is
// not missed.
const startRecording = (page: Page): Promise<void> =>
  page.evaluate(() => {
    const host = document.querySelector('#overlay') as HTMLElement;
    const content = document.querySelector('#content') as HTMLElement;
    const before = document.querySelector('#before') as HTMLElement;
    const after = document.querySelector('#after') as HTMLElement;

    const isRendered = (el: Element): boolean => {
      const { width, height } = el.getBoundingClientRect();
      return width > 0 && height > 0 && el.checkVisibility({ visibilityProperty: true });
    };

    const states: InitialState[] = [];
    const observerOptions: MutationObserverInit = { subtree: true, childList: true, attributes: true };
    let isShadowRootObserved = false;

    const record = (): void => {
      if (host.shadowRoot && !isShadowRootObserved) {
        isShadowRootObserved = true;
        mutationObserver.observe(host.shadowRoot, observerOptions);
      }
      const dialog = host.shadowRoot?.querySelector('dialog');
      const afterTop = after.getBoundingClientRect().top;
      states.push({
        hostDefined: host.matches(':defined'),
        hostDisplay: getComputedStyle(host).display,
        contentVisible: isRendered(content),
        // Not bound to `dialog.open`: `p-drilldown` shows its dialog a few frames before `showModal()` is called.
        dialogVisible: !!dialog && isRendered(dialog),
        gap: afterTop - before.getBoundingClientRect().bottom,
        afterTop,
      });
    };

    const mutationObserver = new MutationObserver(record);
    mutationObserver.observe(document, observerOptions);

    const resizeObserver = new ResizeObserver(record);
    for (const el of [host, content, after]) {
      resizeObserver.observe(el);
    }

    let isRecording = true;
    const onFrame = (): void => {
      if (isRecording) {
        record();
        requestAnimationFrame(onFrame);
      }
    };
    requestAnimationFrame(onFrame);

    (window as RecorderWindow).stopInitialStateRecording = () => {
      isRecording = false;
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      record();
      return states;
    };

    record();
  });

const stopRecording = (page: Page): Promise<InitialState[]> =>
  page.evaluate(() => {
    const stop = (window as RecorderWindow).stopInitialStateRecording;
    if (!stop) throw new Error('startRecording() was not called');
    return stop();
  });

for (const tagName of overlayTagNames) {
  test.describe(tagName, () => {
    const getDialog = (page: Page) => page.locator(`${tagName} dialog`);

    test.describe('when closed', () => {
      test('should take no space and render no slotted content before it is defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: false });

        expect(await isDefined(page, '#overlay')).toBe(false);
        expect(await getElementStyle(page.locator('#overlay'), 'display')).toBe('none');
        expect(await getRect(page, '#overlay')).toEqual({ width: 0, height: 0 });
        expect(await getRect(page, '#content')).toEqual({ width: 0, height: 0 });
        expect(await getGapBetweenSiblings(page)).toBe(0);
        await expect(page.locator('#content')).not.toBeVisible();
      });

      test('should stay closed after it is defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: false });
        await loadDesignSystem(page);

        expect(await isDefined(page, '#overlay')).toBe(true);
        expect(await getElementStyle(getDialog(page), 'visibility')).toBe('hidden');
        await expect(page.locator('#content')).not.toBeVisible();
      });

      test('should neither flash up nor shift its siblings while it is being defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: false });
        await startRecording(page);
        await loadDesignSystem(page);
        const states = await stopRecording(page);

        expect(states[0].hostDefined).toBe(false);
        expect(states[states.length - 1].hostDefined).toBe(true);
        expect(states.filter(({ contentVisible, dialogVisible }) => contentVisible || dialogVisible)).toEqual([]);
        expect(states.filter(({ afterTop }) => afterTop !== states[0].afterTop)).toEqual([]);
      });
    });

    test.describe('when initially open', () => {
      test('should take no space and render no slotted content before it is defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: true });

        expect(await isDefined(page, '#overlay')).toBe(false);
        expect(await getElementStyle(page.locator('#overlay'), 'display')).toBe('none');
        expect(await getRect(page, '#content')).toEqual({ width: 0, height: 0 });
        expect(await getGapBetweenSiblings(page)).toBe(0);
        await expect(page.locator('#content')).not.toBeVisible();
      });

      test('should be open after it is defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: true });
        await loadDesignSystem(page);

        expect(await isDefined(page, '#overlay')).toBe(true);
        await expect.poll(() => getElementStyle(getDialog(page), 'visibility')).toBe('visible');
        await expect(page.locator('#content')).toBeVisible();
      });

      test('should not render its slotted content in the flow while it is being defined', async ({ page }) => {
        await initOverlay(page, tagName, { isOpen: true });
        await startRecording(page);
        await loadDesignSystem(page);
        await expect(page.locator('#content')).toBeVisible();
        const states = await stopRecording(page);

        expect(states[0].hostDefined).toBe(false);
        expect(states[states.length - 1]).toMatchObject({
          hostDefined: true,
          contentVisible: true,
          dialogVisible: true,
        });
        // The slotted content may only be seen inside the dialog, never on its own in the document flow.
        expect(states.filter(({ contentVisible, dialogVisible }) => contentVisible && !dialogVisible)).toEqual([]);
        expect(states.filter(({ afterTop }) => afterTop !== states[0].afterTop)).toEqual([]);
      });
    });
  });
}

test.describe('outside of the closed overlays', () => {
  test('should not hide components rendered by the ssr wrapper before they are defined', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-modal data-ssr><div id="modal-content">Some Content</div></p-modal>
<p-button data-ssr>Some label</p-button>`,
      { injectIntoHead: INITIAL_CSS, withoutLoadCall: true, withoutWaitForComponentsReady: true }
    );

    for (const selector of ['p-modal', 'p-button']) {
      const host = page.locator(selector);
      expect(await isDefined(page, selector)).toBe(false);
      expect(await getElementStyle(host, 'display')).not.toBe('none');
      expect(await getElementStyle(host, 'visibility')).toBe('visible');
    }
    await expect(page.locator('#modal-content')).toBeVisible();
  });

  test('should hide p-popover but keep its trigger in the flow before it is defined', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<div id="before" style="height: 40px"></div>
<p-popover>Some Content</p-popover>
<div id="after" style="height: 40px"></div>`,
      { injectIntoHead: INITIAL_CSS, withoutLoadCall: true, withoutWaitForComponentsReady: true }
    );

    const host = page.locator('p-popover');
    expect(await isDefined(page, 'p-popover')).toBe(false);
    expect(await getElementStyle(host, 'display')).not.toBe('none');
    expect(await getElementStyle(host, 'visibility')).toBe('hidden');
    expect(await getGapBetweenSiblings(page)).toBeGreaterThan(0);
  });

  test('should not hide custom elements of other libraries that are never defined', async ({ page }) => {
    // Mimics the `<next-route-announcer>` that Next.js appends to the body without ever defining it.
    await setContentWithDesignSystem(
      page,
      `<script>
  const announcer = document.createElement('next-route-announcer');
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'assertive');
  liveRegion.setAttribute('role', 'alert');
  liveRegion.textContent = 'Some page title';
  announcer.attachShadow({ mode: 'open' }).append(liveRegion);
  document.body.append(announcer);
</script>`,
      { injectIntoHead: INITIAL_CSS, withoutLoadCall: true, withoutWaitForComponentsReady: true }
    );

    const host = page.locator('next-route-announcer');
    const liveRegion = page.locator('next-route-announcer [aria-live]');
    expect(await isDefined(page, 'next-route-announcer')).toBe(false);
    expect(await getElementStyle(host, 'visibility')).toBe('visible');
    expect(await getElementStyle(liveRegion, 'visibility')).toBe('visible');
    await expect(liveRegion).toBeVisible();
  });
});
