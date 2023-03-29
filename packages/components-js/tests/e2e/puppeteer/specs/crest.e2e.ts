import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
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

const setContent = () => setContentWithDesignSystem(page, `<p-crest></p-crest>`);
const setContentWithLink = () =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-crest id="hostElement" href="about:blank#"></p-crest>
    </div>`
  );

const getHost = () => selectNode(page, 'p-crest');
const getSource = (): Promise<ElementHandle> => selectNode(page, 'p-crest >>> source');
const getLink = () => selectNode(page, 'p-crest >>> a');
const getImage = () => selectNode(page, 'p-crest >>> img');

const resolution1x = '@1x';
const resolution2x = '@2x';
const resolution3x = '@3x';

describe('crest', () => {
  const fileName = 'crest';

  describe('on default screen', () => {
    beforeEach(async () => await page.setViewport({ width: 1299, height: 300 }));

    it('should request correct image for 1x resolution', async () => {
      await setContent();

      expect(requestedImagePath).toContain(fileName);
      expect(requestedImagePath).toContain(resolution1x);
    });

    it('should request correct image for 2x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 2 });
      await setContent();

      expect(requestedImagePath).toContain(fileName);
      expect(requestedImagePath).toContain(resolution2x);
    });

    it('should request correct image for 3x resolution', async () => {
      await page.setViewport({ ...page.viewport(), deviceScaleFactor: 3 });
      await setContent();

      expect(requestedImagePath).toContain(fileName);
      expect(requestedImagePath).toContain(resolution3x);
    });
  });
});

describe('with link', () => {
  it('should render <a> tag when href prop is defined', async () => {
    await setContent();

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
        <p-crest href="#" id="my-link">Some label</p-crest>
        <a href="#" id="after">after</a>
      </div>`
    );

    const crest = await getHost();
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

  it('should provide methods to focus & blur the element', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-crest href="#">Some label</p-crest>
      </div>`
    );

    const crestHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-crest'));

    const crest = await getHost();
    const before = await selectNode(page, '#before');

    await before.focus();
    expect(await crestHasFocus()).toBe(false);

    await crest.focus();
    expect(await crestHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-crest') as HTMLElement).blur());
    expect(await crestHasFocus()).toBe(false);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await setContent();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-crest'], 'componentDidLoad: p-crest').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await setContent();
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
