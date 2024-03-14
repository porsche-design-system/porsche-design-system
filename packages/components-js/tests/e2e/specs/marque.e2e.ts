import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.route('**', (route) => route.continue()); // Disables cache
});

const setContentWithoutTrademark = (page: Page) =>
  setContentWithDesignSystem(page, `<p-marque trademark="false"></p-marque>`);
const setContentWithTrademark = (page: Page) => setContentWithDesignSystem(page, `<p-marque></p-marque>`);
const setContentWithLink = (page: Page) =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-marque id="hostElement" href="about:blank#"></p-marque>
    </div>`
  );

const getHost = (page: Page) => page.$('p-marque');
const getSource = (page: Page): Promise<ElementHandle<HTMLElement | SVGElement>> => page.$('p-marque source');
const getLink = (page: Page) => page.$('p-marque a');

const getImageRequest = (page: Page) =>
  page.waitForRequest((request) => request.url().endsWith('.png') || request.url().endsWith('.webp'));

const resolution1x = '@1x';
const resolution2x = '@2x';
const resolution3x = '@3x';

skipInBrowsers(['firefox', 'webkit']);

test.describe('with trademark', () => {
  const fileNameSmall = 'marque-trademark.small';
  const fileNameMedium = 'marque-trademark.medium';

  test.describe('on default screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1299, height: 300 });
    });

    test('should request correct image for 1x resolution', async ({ page }) => {
      const imgRequest1 = getImageRequest(page);
      await setContentWithTrademark(page);
      const host = await getHost(page);

      const imgUrl1 = (await imgRequest1).url();
      expect(imgUrl1).toContain(fileNameSmall);
      expect(imgUrl1).toContain(resolution1x);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      const imgUrl2 = (await imgRequest2).url();
      expect(imgUrl2).toContain(fileNameSmall);
      expect(imgUrl2).toContain(resolution1x);

      const imgRequest3 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      const imgUrl3 = (await imgRequest3).url();
      expect(imgUrl3).toContain(fileNameMedium);
      expect(imgUrl3).toContain(resolution1x);
    });

    // TODO: Group tests by deviceScaleFactor once for whole test file
    test.describe('deviceScaleFactor: 2', () => {
      test.use({ deviceScaleFactor: 2 });
      test('should request correct image for 2x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1).toContain(fileNameSmall);
        expect(imgUrl1).toContain(resolution2x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution2x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3).toContain(fileNameMedium);
        expect(imgUrl3).toContain(resolution2x);
      });
    });
    test.describe('deviceScaleFactor: 3', () => {
      test.use({ deviceScaleFactor: 3 });
      test('should request correct image for 3x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1).toContain(fileNameSmall);
        expect(imgUrl1).toContain(resolution3x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution3x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3).toContain(fileNameMedium);
        expect(imgUrl3).toContain(resolution3x);
      });
    });
  });

  test.describe('on large screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1300, height: 300 });
    });

    test('should set correct srcSet', async ({ page }) => {
      await setContentWithTrademark(page);
      const host = await getHost(page);

      expect(await getProperty(await getSource(page), 'srcset'), 'initial size').toContain(fileNameMedium);

      const imgRequest1 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      await imgRequest1;
      expect(await getProperty(await getSource(page), 'srcset'), 'size after first change').toContain(fileNameSmall);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      await imgRequest2;
      expect(await getProperty(await getSource(page), 'srcset'), 'size after second change').toContain(fileNameMedium);
    });

    test('should request correct image for 1x resolution', async ({ page }) => {
      const imgRequest1 = getImageRequest(page);
      await setContentWithTrademark(page);
      const host = await getHost(page);

      const imgUrl1 = (await imgRequest1).url();
      expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
      expect(imgUrl1, 'initial request resolution').toContain(resolution1x);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      const imgUrl2 = (await imgRequest2).url();
      expect(imgUrl2).toContain(fileNameSmall);
      expect(imgUrl2).toContain(resolution1x);

      const imgRequest3 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      const imgUrl3 = (await imgRequest3).url();
      expect(imgUrl3, 'final request size').toContain(fileNameMedium);
      expect(imgUrl3, 'final request resolution').toContain(resolution1x);
    });

    test.describe('deviceScaleFactor: 2', () => {
      test.use({ deviceScaleFactor: 2 });
      test('should request correct image for 2x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
        expect(imgUrl1, 'initial request resolution').toContain(resolution2x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution2x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3, 'final request size').toContain(fileNameMedium);
        expect(imgUrl3, 'final request resolution').toContain(resolution2x);
      });
    });

    test.describe('deviceScaleFactor: 3', () => {
      test.use({ deviceScaleFactor: 3 });
      test('should request correct image for 3x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
        expect(imgUrl1, 'initial request resolution').toContain(resolution3x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution3x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3, 'final request size').toContain(fileNameMedium);
        expect(imgUrl3, 'final request resolution').toContain(resolution3x);
      });
    });
  });
});

test.describe('without trademark', () => {
  const fileNameSmall = 'marque.small';
  const fileNameMedium = 'marque.medium';

  test.describe('on default screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1299, height: 300 });
    });

    test('should request correct image for 1x resolution', async ({ page }) => {
      const imgRequest1 = getImageRequest(page);
      await setContentWithoutTrademark(page);
      const host = await getHost(page);

      const imgUrl1 = (await imgRequest1).url();
      expect(imgUrl1).toContain(fileNameSmall);
      expect(imgUrl1).toContain(resolution1x);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      const imgUrl2 = (await imgRequest2).url();
      expect(imgUrl2).toContain(fileNameSmall);
      expect(imgUrl2).toContain(resolution1x);

      const imgRequest3 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      const imgUrl3 = (await imgRequest3).url();
      expect(imgUrl3).toContain(fileNameMedium);
      expect(imgUrl3).toContain(resolution1x);
    });

    test.describe('deviceScaleFactor: 2', () => {
      test.use({ deviceScaleFactor: 2 });
      test('should request correct image for 2x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithoutTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1).toContain(fileNameSmall);
        expect(imgUrl1).toContain(resolution2x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution2x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3).toContain(fileNameMedium);
        expect(imgUrl3).toContain(resolution2x);
      });
    });

    test.describe('deviceScaleFactor: 3', () => {
      test.use({ deviceScaleFactor: 3 });
      test('should request correct image for 3x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithoutTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1).toContain(fileNameSmall);
        expect(imgUrl1).toContain(resolution3x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution3x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3).toContain(fileNameMedium);
        expect(imgUrl3).toContain(resolution3x);
      });
    });
  });

  test.describe('on large screen', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1300, height: 300 });
    });

    test('should set correct srcSet', async ({ page }) => {
      await setContentWithoutTrademark(page);
      const host = await getHost(page);

      expect(await getProperty(await getSource(page), 'srcset'), 'initial size').toContain(fileNameMedium);

      const imgRequest1 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      await imgRequest1;
      expect(await getProperty(await getSource(page), 'srcset'), 'size after first change').toContain(fileNameSmall);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      await imgRequest2;
      expect(await getProperty(await getSource(page), 'srcset'), 'size after second change').toContain(fileNameMedium);
    });

    test('should request correct image for 1x resolution', async ({ page }) => {
      const imgRequest1 = getImageRequest(page);
      await setContentWithoutTrademark(page);
      const host = await getHost(page);

      const imgUrl1 = (await imgRequest1).url();
      expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
      expect(imgUrl1, 'initial request resolution').toContain(resolution1x);

      const imgRequest2 = getImageRequest(page);
      await setProperty(host, 'size', 'small');
      const imgUrl2 = (await imgRequest2).url();
      expect(imgUrl2).toContain(fileNameSmall);
      expect(imgUrl2).toContain(resolution1x);

      const imgRequest3 = getImageRequest(page);
      await setProperty(host, 'size', 'medium');
      const imgUrl3 = (await imgRequest3).url();
      expect(imgUrl3, 'final request size').toContain(fileNameMedium);
      expect(imgUrl3, 'final request resolution').toContain(resolution1x);
    });

    test.describe('deviceScaleFactor: 2', () => {
      test.use({ deviceScaleFactor: 2 });
      test('should request correct image for 2x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithoutTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
        expect(imgUrl1, 'initial request resolution').toContain(resolution2x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution2x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3, 'final request size').toContain(fileNameMedium);
        expect(imgUrl3, 'final request resolution').toContain(resolution2x);
      });
    });

    test.describe('deviceScaleFactor: 3', () => {
      test.use({ deviceScaleFactor: 3 });
      test('should request correct image for 3x resolution', async ({ page }) => {
        const imgRequest1 = getImageRequest(page);
        await setContentWithoutTrademark(page);
        const host = await getHost(page);

        const imgUrl1 = (await imgRequest1).url();
        expect(imgUrl1, 'initial request size').toContain(fileNameMedium);
        expect(imgUrl1, 'initial request resolution').toContain(resolution3x);

        const imgRequest2 = getImageRequest(page);
        await setProperty(host, 'size', 'small');
        const imgUrl2 = (await imgRequest2).url();
        expect(imgUrl2).toContain(fileNameSmall);
        expect(imgUrl2).toContain(resolution3x);

        const imgRequest3 = getImageRequest(page);
        await setProperty(host, 'size', 'medium');
        const imgUrl3 = (await imgRequest3).url();
        expect(imgUrl3, 'final request size').toContain(fileNameMedium);
        expect(imgUrl3, 'final request resolution').toContain(resolution3x);
      });
    });
  });
});

test.describe('with link', () => {
  test('should render <a> tag when href prop is defined', async ({ page }) => {
    await setContentWithTrademark(page);

    const host = await getHost(page);

    expect(await getLink(page)).toBe(null);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);
    expect(await getLink(page)).not.toBe(null);
  });

  test('should dispatch correct click events', async ({ page }) => {
    await setContentWithLink(page);

    const wrapper = await page.$('div');
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

  test('should trigger focus & blur events at the correct time', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#" id="my-link">Some label</p-marque>
        <a href="#" id="after">after</a>
      </div>`
    );

    const marque = await getHost(page);
    const before = await page.$('#before');
    const after = await page.$('#after');

    await addEventListener(before, 'focus');
    await addEventListener(marque, 'focus');
    await addEventListener(marque, 'focusin');
    await addEventListener(marque, 'blur');
    await addEventListener(marque, 'focusout');
    await addEventListener(after, 'focus');

    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls initially').toBe(0);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls initially').toBe(0);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls initially').toBe(0);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls initially').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls after 1st tab').toBe(0);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls after 1st tab').toBe(0);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls after 1st tab').toBe(0);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls after 1st tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(marque, 'focus')).counter, 'marqueFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(marque, 'focusin')).counter, 'marqueFocusInCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(marque, 'blur')).counter, 'marqueBlurCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(marque, 'focusout')).counter, 'marqueFocusOutCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

    await page.keyboard.up('ShiftLeft');
  });

  test('should provide methods to focus & blur the element', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#">Some label</p-marque>
      </div>`
    );

    const marqueHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-marque'));

    const marque = await getHost(page);
    const before = await page.$('#before');

    await before.focus();
    expect(await marqueHasFocus()).toBe(false);

    await marque.focus();
    expect(await marqueHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-marque') as HTMLElement).blur());
    expect(await marqueHasFocus()).toBe(false);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await setContentWithTrademark(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-marque'], 'componentDidLoad: p-marque').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
