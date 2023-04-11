import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';

let page: Page;
let requestedImagePath: string;

beforeEach(async () => {
  page = await browser.newPage();
  requestedImagePath = '';

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.endsWith('.png') || url.endsWith('.webp')) {
      requestedImagePath = url;
    }
    req.continue();
  });
});
afterEach(async () => await page.close());

const setContentWithoutTrademark = () => setContentWithDesignSystem(page, `<p-marque trademark="false"></p-marque>`);
const setContentWithTrademark = () => setContentWithDesignSystem(page, `<p-marque></p-marque>`);
const setContentWithLink = () =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-marque id="hostElement" href="about:blank#"></p-marque>
    </div>`
  );

const getHost = () => selectNode(page, 'p-marque');
const getSource = (): Promise<ElementHandle> => selectNode(page, 'p-marque >>> source');
const getLink = () => selectNode(page, 'p-marque >>> a');
const getImage = () => selectNode(page, 'p-marque >>> img');

const resolution1x = '@1x';
const resolution2x = '@2x';
const resolution3x = '@3x';

describe('with trademark', () => {
  const fileNameSmall = 'marque-trademark.small';
  const fileNameMedium = 'marque-trademark.medium';

  describe('on default screen', () => {
    beforeEach(async () => await page.setViewport({ width: 1299, height: 300 }));

    it('should request correct image for 1x resolution', async () => {
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution1x);
    });

    it('should request correct image for 2x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution2x);
    });

    it('should request correct image for 3x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution3x);
    });
  });

  describe('on large screen', () => {
    beforeEach(async () => {
      await page.setCacheEnabled(false);
      await page.setViewport({ width: 1300, height: 300 });
    });

    it('should set correct srcSet', async () => {
      await setContentWithTrademark();
      const host = await getHost();

      expect(await getProperty(await getSource(), 'srcset'), 'initial size').toContain(fileNameMedium);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(await getProperty(await getSource(), 'srcset'), 'size after first change').toContain(fileNameSmall);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(await getProperty(await getSource(), 'srcset'), 'size after second change').toContain(fileNameMedium);
    });

    it('should request correct image for 1x resolution', async () => {
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution1x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution1x);
    });

    it('should request correct image for 2x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution2x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution2x);
    });

    it('should request correct image for 3x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
      await setContentWithTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution3x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution3x);
    });
  });
});

describe('without trademark', () => {
  const fileNameSmall = 'marque.small';
  const fileNameMedium = 'marque.medium';

  describe('on default screen', () => {
    beforeEach(async () => await page.setViewport({ width: 1299, height: 300 }));

    it('should request correct image for 1x resolution', async () => {
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution1x);
    });

    it('should request correct image for 2x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution2x);
    });

    it('should request correct image for 3x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameMedium);
      expect(requestedImagePath).toContain(resolution3x);
    });
  });

  describe('on large screen', () => {
    beforeEach(async () => {
      await page.setCacheEnabled(false);
      await page.setViewport({ width: 1300, height: 300 });
    });

    it('should set correct srcSet', async () => {
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(await getProperty(await getSource(), 'srcset'), 'initial size').toContain(fileNameMedium);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(await getProperty(await getSource(), 'srcset'), 'size after first change').toContain(fileNameSmall);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(await getProperty(await getSource(), 'srcset'), 'size after second change').toContain(fileNameMedium);
    });

    it('should request correct image for 1x resolution', async () => {
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution1x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution1x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution1x);
    });

    it('should request correct image for 2x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution2x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution2x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution2x);
    });

    it('should request correct image for 3x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
      await setContentWithoutTrademark();
      const host = await getHost();

      expect(requestedImagePath, 'initial request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'initial request resolution').toContain(resolution3x);

      await setProperty(host, 'size', 'small');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath).toContain(fileNameSmall);
      expect(requestedImagePath).toContain(resolution3x);

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      expect(requestedImagePath, 'final request size').toContain(fileNameMedium);
      expect(requestedImagePath, 'final request resolution').toContain(resolution3x);
    });
  });
});

describe('with link', () => {
  it('should render <a> tag when href prop is defined', async () => {
    await setContentWithTrademark();

    const host = await getHost();

    expect(await getLink()).toBe(null);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);
    expect(await getLink()).not.toBe(null);
  });

  it('should dispatch correct click events', async () => {
    await setContentWithLink();

    const wrapper = await selectNode(page, 'div');
    const host = await getHost();
    const link = await getLink();

    await addEventListener(wrapper, 'click');

    await link.click();
    await host.click();
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(2);
    for (const target of targets) {
      expect(target.id).toBe('hostElement');
    }
  });

  it('should trigger focus & blur events at the correct time', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#" id="my-link">Some label</p-marque>
        <a href="#" id="after">after</a>
      </div>`
    );

    const marque = await getHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

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

  it('should provide methods to focus & blur the element', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#">Some label</p-marque>
      </div>`
    );

    const marqueHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-marque'));

    const marque = await getHost();
    const before = await selectNode(page, '#before');

    await before.focus();
    expect(await marqueHasFocus()).toBe(false);

    await marque.focus();
    expect(await marqueHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-marque') as HTMLElement).blur());
    expect(await marqueHasFocus()).toBe(false);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await setContentWithTrademark();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-marque'], 'componentDidLoad: p-marque').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await setContentWithTrademark();
    const image = await getImage();

    await expectA11yToMatchSnapshot(page, image);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await setContentWithLink();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
