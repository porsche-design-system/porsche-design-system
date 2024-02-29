import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowser,
  waitForStencilLifecycle,
} from '../helpers';

let requestedImagePath: string;

test.beforeEach(async ({ page }) => {
  requestedImagePath = '';

  await page.route('**/*', async (route) => {
    const url = route.request().url();

    if (url.endsWith('.png') || url.endsWith('.webp')) {
      requestedImagePath = url;
    }

    await route.continue();
  });
});

const setContent = (page: Page) => setContentWithDesignSystem(page, `<p-crest></p-crest>`);
const setContentWithLink = (page: Page) =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-crest id="hostElement" href="about:blank#"></p-crest>
    </div>`
  );

const getHost = (page: Page) => selectNode(page, 'p-crest');
const getLink = (page: Page) => selectNode(page, 'p-crest >>> a');
test.describe('on default screen', () => {
  const viewport = { width: 1299, height: 300 };

  for (const resolution of [1, 2, 3]) {
    const resolutionString = `@${resolution}x`;

    test.describe(`resolution ${resolutionString}`, () => {
      test.use({
        viewport,
        deviceScaleFactor: resolution,
      });

      test(`should request correct image for ${resolutionString} resolution`, async ({ page }) => {
        await setContent(page);

        expect(requestedImagePath).toContain('crest');
        expect(requestedImagePath).toContain(resolutionString);
      });
    });
  }
});

test.describe('with link', () => {
  test('should render <a> tag when href prop is defined', async ({ page }) => {
    await setContent(page);

    const host = await getHost(page);

    expect(await getLink(page)).toBe(null);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);
    expect(await getLink(page)).not.toBe(null);
  });

  test('should dispatch correct click events', async ({ page }) => {
    await setContentWithLink(page);

    const wrapper = await selectNode(page, 'div');
    const host = await getHost(page);
    const link = await getLink(page);

    await addEventListener(wrapper, 'click');

    await link.click();
    await host.click();
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(2);

    for (const target of targets) {
      expect(target.id).toBe('hostElement');
    }
  });

  skipInBrowser(['firefox', 'webkit'], () => {
    test('should trigger focus & blur events at the correct time', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-crest href="#" id="my-link">Some label</p-crest>
        <a href="#" id="after">after</a>
      </div>`
      );

      const crest = await getHost(page);
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      await addEventListener(before, 'focus');
      await addEventListener(crest, 'focus');
      await addEventListener(crest, 'focusin');
      await addEventListener(crest, 'blur');
      await addEventListener(crest, 'focusout');
      await addEventListener(after, 'focus');

      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls initially').toBe(0);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls initially').toBe(0);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls initially').toBe(0);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls initially').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls after 1st tab').toBe(0);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls after 1st tab').toBe(0);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls after 1st tab').toBe(0);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls after 1st tab').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls after 2nd tab').toBe(0);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls after 2nd tab').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls after 1st tab back').toBe(2);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls after 1st tab back').toBe(2);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(crest, 'focus')).counter, 'crestFocusCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(crest, 'focusin')).counter, 'crestFocusInCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(crest, 'blur')).counter, 'crestBlurCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(crest, 'focusout')).counter, 'crestFocusOutCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

      await page.keyboard.up('ShiftLeft');
    });
  });

  test('should provide methods to focus & blur the element', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-crest href="#">Some label</p-crest>
      </div>`
    );

    const crestHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-crest'));

    const crest = await getHost(page);
    const before = await selectNode(page, '#before');

    await before.focus();
    expect(await crestHasFocus()).toBe(false);

    await crest.focus();
    expect(await crestHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-crest') as HTMLElement).blur());
    expect(await crestHasFocus()).toBe(false);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await setContent(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-crest'], 'componentDidLoad: p-crest').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
