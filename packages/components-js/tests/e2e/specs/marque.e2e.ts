import {
  addEventListener,
  expectedStyleOnFocus,
  getActiveElementId,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('marque', () => {
  let page: Page;
  let requestedImagePath: string;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
    requestedImagePath = '';

    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.endsWith('.png')) {
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
  const getLink = () => selectNode(page, 'p-marque >>> a');

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
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      beforeEach(async () => await page.setViewport({ width: 1300, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);
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
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });

    describe('on large screen', () => {
      beforeEach(async () => await page.setViewport({ width: 1300, height: 300 }));

      it('should request correct image for 1x resolution', async () => {
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution1x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution1x);
      });

      it('should request correct image for 2x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution2x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution2x);
      });

      it('should request correct image for 3x resolution', async () => {
        await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
        await setContentWithoutTrademark();
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'small');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameSmall);
        expect(requestedImagePath).toContain(resolution3x);

        await setAttribute(await getHost(), 'size', 'medium');
        await waitForStencilLifecycle(page);
        expect(requestedImagePath).toContain(fileNameMedium);
        expect(requestedImagePath).toContain(resolution3x);
      });
    });
  });

  describe('with link', () => {
    it('should render <a> tag when href prop is defined', async () => {
      await setContentWithTrademark();

      const host = await getHost();

      expect(await getLink()).toBe(null);

      await setAttribute(host, 'href', '#some-link');
      await waitForStencilLifecycle(page);
      expect(await getLink()).not.toBe(null);
    });

    it('should sync href and target prop when changed programmatically', async () => {
      await setContentWithLink();

      const host = await getHost();
      const link = await getLink();

      expect(await getAttribute(link, 'href')).toBe('about:blank#');
      expect(await getAttribute(link, 'target')).toBe('_self');

      await setAttribute(host, 'href', '#some-link');
      await setAttribute(host, 'target', '_blank');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(link, 'href')).toBe('#some-link');
      expect(await getAttribute(link, 'target')).toBe('_blank');
    });

    it('should dispatch correct click events', async () => {
      await setContentWithLink();

      const wrapper = await selectNode(page, 'div');
      const host = await getHost();
      const link = await getLink();

      const events = [];
      await addEventListener(wrapper, 'click', (ev) => events.push(ev));

      await link.click();
      await host.click();
      await waitForStencilLifecycle(page);

      expect(events.length).toBe(2);
      for (const event of events) {
        expect(event.target.id).toBe('hostElement');
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
      </div>
    `
      );

      const marque = await getHost();
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      let beforeFocusCalls = 0;
      await addEventListener(before, 'focus', () => beforeFocusCalls++);
      let marqueFocusCalls = 0;
      await addEventListener(marque, 'focus', () => marqueFocusCalls++);
      let marqueFocusInCalls = 0;
      await addEventListener(marque, 'focusin', () => marqueFocusInCalls++);
      let marqueBlurCalls = 0;
      await addEventListener(marque, 'blur', () => marqueBlurCalls++);
      let marqueFocusOutCalls = 0;
      await addEventListener(marque, 'focusout', () => marqueFocusOutCalls++);
      let afterFocusCalls = 0;
      await addEventListener(after, 'focus', () => afterFocusCalls++);

      expect(beforeFocusCalls).toBe(0);
      expect(marqueFocusCalls).toBe(0);
      expect(marqueFocusInCalls).toBe(0);
      expect(marqueBlurCalls).toBe(0);
      expect(marqueFocusOutCalls).toBe(0);
      expect(afterFocusCalls).toBe(0);
      expect(await getActiveElementId(page)).toBe('');

      await page.keyboard.press('Tab');
      expect(beforeFocusCalls).toBe(1);
      expect(marqueFocusCalls).toBe(0);
      expect(marqueFocusInCalls).toBe(0);
      expect(marqueBlurCalls).toBe(0);
      expect(marqueFocusOutCalls).toBe(0);
      expect(afterFocusCalls).toBe(0);
      expect(await getActiveElementId(page)).toBe('before');

      await page.keyboard.press('Tab');
      expect(beforeFocusCalls).toBe(1);
      expect(marqueFocusCalls).toBe(1);
      expect(marqueFocusInCalls).toBe(1);
      expect(marqueBlurCalls).toBe(0);
      expect(marqueFocusOutCalls).toBe(0);
      expect(afterFocusCalls).toBe(0);
      expect(await getActiveElementId(page)).toBe('my-link');

      await page.keyboard.press('Tab');
      expect(beforeFocusCalls).toBe(1);
      expect(marqueFocusCalls).toBe(1);
      expect(marqueFocusInCalls).toBe(1);
      expect(marqueBlurCalls).toBe(1);
      expect(marqueFocusOutCalls).toBe(1);
      expect(afterFocusCalls).toBe(1);
      expect(await getActiveElementId(page)).toBe('after');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect(beforeFocusCalls).toBe(1);
      expect(marqueFocusCalls).toBe(2);
      expect(marqueFocusInCalls).toBe(2);
      expect(marqueBlurCalls).toBe(1);
      expect(marqueFocusOutCalls).toBe(1);
      expect(afterFocusCalls).toBe(1);
      expect(await getActiveElementId(page)).toBe('my-link');

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect(beforeFocusCalls).toBe(2);
      expect(marqueFocusCalls).toBe(2);
      expect(marqueFocusInCalls).toBe(2);
      expect(marqueBlurCalls).toBe(2);
      expect(marqueFocusOutCalls).toBe(2);
      expect(afterFocusCalls).toBe(1);
      expect(await getActiveElementId(page)).toBe('before');

      await page.keyboard.up('ShiftLeft');
    });

    it('should provide methods to focus & blur the element', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#">Some label</p-marque>
      </div>
    `
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

  describe('focus state', () => {
    it('should show outline by keyboard navigation only for shadowed <a> when it is focused', async () => {
      await setContentWithLink();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '0px' });
      const visible = expectedStyleOnFocus({ color: 'default', offset: '0px' });

      expect(await getOutlineStyle(link)).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link)).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await setContentWithTrademark();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-marque']).toBe(1, 'componentDidLoad: p-marque');

      expect(status.componentDidLoad.all).toBe(1, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });
  });
});
