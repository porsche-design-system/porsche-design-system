import {
  addEventListener,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getAttribute,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('marque', () => {
  let page: Page;
  let requestedImagePath: string;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
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

    it('should sync href and target prop when changed programmatically', async () => {
      await setContentWithLink();

      const host = await getHost();
      const link = await getLink();

      expect(await getAttribute(link, 'href')).toBe('about:blank#');
      expect(await getAttribute(link, 'target')).toBe('_self');

      await setProperty(host, 'href', '#some-link');
      await setProperty(host, 'target', '_blank');
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

      expect(beforeFocusCalls, 'beforeFocusCalls initially').toBe(0);
      expect(marqueFocusCalls, 'marqueFocusCalls initially').toBe(0);
      expect(marqueFocusInCalls, 'marqueFocusInCalls initially').toBe(0);
      expect(marqueBlurCalls, 'marqueBlurCalls initially').toBe(0);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls initially').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls initially').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab').toBe(1);
      expect(marqueFocusCalls, 'marqueFocusCalls after 1st tab').toBe(0);
      expect(marqueFocusInCalls, 'marqueFocusInCalls after 1st tab').toBe(0);
      expect(marqueBlurCalls, 'marqueBlurCalls after 1st tab').toBe(0);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls after 1st tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after 1st tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab').toBe(1);
      expect(marqueFocusCalls, 'marqueFocusCalls after 2nd tab').toBe(1);
      expect(marqueFocusInCalls, 'marqueFocusInCalls after 2nd tab').toBe(1);
      expect(marqueBlurCalls, 'marqueBlurCalls after 2nd tab').toBe(0);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls after 2nd tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after 2nd tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 3rd tab').toBe(1);
      expect(marqueFocusCalls, 'marqueFocusCalls after 3rd tab').toBe(1);
      expect(marqueFocusInCalls, 'marqueFocusInCalls after 3rd tab').toBe(1);
      expect(marqueBlurCalls, 'marqueBlurCalls after 3rd tab').toBe(1);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls after 3rd tab').toBe(1);
      expect(afterFocusCalls, 'afterFocusCalls after 3rd tab').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab back').toBe(1);
      expect(marqueFocusCalls, 'marqueFocusCalls after 1st tab back').toBe(2);
      expect(marqueFocusInCalls, 'marqueFocusInCalls after 1st tab back').toBe(2);
      expect(marqueBlurCalls, 'marqueBlurCalls after 1st tab back').toBe(1);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls after 1st tab back').toBe(1);
      expect(afterFocusCalls, 'afterFocusCalls after 1st tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab back').toBe(2);
      expect(marqueFocusCalls, 'marqueFocusCalls after 2nd tab back').toBe(2);
      expect(marqueFocusInCalls, 'marqueFocusInCalls after 2nd tab back').toBe(2);
      expect(marqueBlurCalls, 'marqueBlurCalls after 2nd tab back').toBe(2);
      expect(marqueFocusOutCalls, 'marqueFocusOutCalls after 2nd tab back').toBe(2);
      expect(afterFocusCalls, 'afterFocusCalls after 2nd tab back').toBe(1);
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
    it('should be removed from tab order for tabindex -1', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-marque href="#" tabindex="-1">Some label</p-marque>
        <a href="#" id="after">after</a>
      </div>
    `
      );

      const host = await getHost();
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      await before.focus();

      let hostFocusCalls = 0;
      await addEventListener(host, 'focus', () => hostFocusCalls++);
      let afterFocusCalls = 0;
      await addEventListener(after, 'focus', () => afterFocusCalls++);

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(hostFocusCalls, 'hostFocusCalls after tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after tab').toBe(1);

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(hostFocusCalls, 'marqueFocusCalls after second tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after second tab').toBe(1);
    });

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
});
