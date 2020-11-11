import { ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  getAttribute,
  getBrowser,
  getElementPositions,
  getProperty, getStyleOnFocus,
  initAddEventListener,
  reattachElement,
  selectNode, setAttribute,
  setContentWithDesignSystem, waitForInheritedCSSTransition,
  waitForStencilLifecycle
} from '../helpers';
import { expectedStyleOnFocus } from '../constants';

export const CSS_ANIMATION_DURATION = 1000;
export const FOCUS_PADDING = 8;
const TABS_SCROLL_PERCENTAGE = 0.2;

describe('tabs-bar', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-tabs-bar');
  const getAllButtons = () => page.$$('button');
  const getAllLinks = () => page.$$('a');
  const getScrollArea = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__scroll-area');
  const getStatusBar = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__status-bar');
  const getGradientNext = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__gradient--next');
  const getActionPrevContainer = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--prev');
  const getActionNextContainer = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--next');
  const getPrevButton = async () =>
    (await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--prev')).$('.p-tabs-bar__action--prev > p-button-pure');
  const getNextButton = async () =>
    (await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--next ')).$(
      '.p-tabs-bar__action--next > p-button-pure'
    );
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');
  const getElementFocus = async (elementIndex: number): Promise<boolean> => {
    const snapshot = await page.accessibility.snapshot();
    const element = snapshot.children[elementIndex];
    return element.focused;
  };

  it('should render correct active tab if attribute is set ', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
    `
    );
    const allButtons = await getAllButtons();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(allButtons[2], 'aria-selected')).toBe('false');
  });

  it('should render only one selected tab if multiple selected are set', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="0">
        <button>Content1</button>
        <button selected>Content2</button>
        <button selected>Content3</button>
      </p-tabs-bar>
    `
    );
    const allButtons = await getAllButtons();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('true');
    expect(await getAttribute(allButtons[1], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[2], 'aria-selected')).toBe('false');
  });

  it('should render scroll 20% on Button next', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
          <button>Content7</button>
          <button>Content8</button>
        </p-tabs-bar>
      </div>
    `
    );
    const nextButton = await getNextButton();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * TABS_SCROLL_PERCENTAGE);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render scroll 20% on Button prev', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
          <button>Content7</button>
          <button>Content8</button>
        </p-tabs-bar>
      </div>
    `
    );
    const nextButton = await getNextButton();
    const prevButton = await getPrevButton();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * TABS_SCROLL_PERCENTAGE);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance * 2);

    await prevButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await prevButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(0);
  });

  it('should scroll to max scroll-position on next click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
        </p-tabs-bar>
      </div>
    `
    );
    const [firstButton] = await getAllButtons();
    const nextButton = await getNextButton();
    const scrollArea = await getScrollArea();

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const scrollPosition = await getScrollLeft(scrollArea);

    await firstButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const scrollMax = await page.evaluate((): number => {
      const scrollArea = document.querySelector('p-tabs-bar').shadowRoot.querySelector('.p-tabs-bar__scroll-area');
      scrollArea.scrollTo({ left: scrollArea.scrollWidth });
      return scrollArea.scrollLeft;
    });

    expect(scrollPosition).toEqual(scrollMax);
  });

  it('should render correct scroll-position on selected tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar active-tab-index="3" size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
          <button>Content7</button>
          <button>Content8</button>
        </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const selectedTabOffset = await getProperty(allButtons[3], 'offsetLeft');
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollDistance = +selectedTabOffset - +gradientWidth + FOCUS_PADDING;

    await waitForStencilLifecycle(page);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render correct scroll-position on tab click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
          <button>Content7</button>
          <button>Content8</button>
        </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await allButtons[4].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab3offset = await getProperty(allButtons[4], 'offsetLeft');
    const scrollDistanceRight = +tab3offset - +gradientWidth + FOCUS_PADDING;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await allButtons[3].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab2offset = await getProperty(allButtons[3], 'offsetLeft');
    const tabWidth = await getProperty(allButtons[3], 'offsetWidth');
    const scrollDistanceLeft = +tab2offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should render correct selected tab on scrollArea click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="3" size="medium">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
        <button>Content4</button>
      </p-tabs-bar>
    `
    );
    const allButtons = await getAllButtons();
    const scrollArea = await getScrollArea();

    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[3], 'aria-selected')).toBe('true');

    await scrollArea.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(40);

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[3], 'aria-selected')).toBe('true');
  });

  it('should render same offsetLeft on Statusbar and active tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar active-tab-index="2" size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
        </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const statusBar = await getStatusBar();
    const tab3Position = (await getElementPositions(page, allButtons[2])).left;

    expect(Math.round(tab3Position)).toEqual(Math.floor((await getElementPositions(page, statusBar)).left));

    await allButtons[0].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect((await getElementPositions(page, allButtons[0])).left).toEqual(
      Math.floor((await getElementPositions(page, statusBar)).left)
    );
  });

  it('should render focus on selected tab on keyboard "tab" click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
      `
    );
    const getButtonFocus = async () => {
      const snapshot = await page.accessibility.snapshot();
      const button = snapshot.children[0];
      return button.focused;
    };
    expect(await getButtonFocus()).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await getButtonFocus()).toBe(true);
  });

  it('should render focus on content on keyboard "tab" click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
      <p-text>Hallo <a href="#">Link</a></p-text>
    `
    );
    expect(await getElementFocus(4)).toBeFalsy();

    await page.keyboard.press('Tab');
    expect(await getElementFocus(4)).toBeFalsy();
    await page.keyboard.press('Tab');

    expect(await getElementFocus(4)).toBe(true);
  });

  it('should render correct focusedTab on arrow-key press', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
    `
    );
    expect(await getElementFocus(0)).toBeFalsy();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getElementFocus(0)).toBeTrue();

    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await getElementFocus(0)).toBeFalsy();
    expect(await getElementFocus(1)).toBeTrue();

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await getElementFocus(0)).toBeTrue();
    expect(await getElementFocus(1)).toBeFalsy();
  });

  it('should render correct active tab on first/last or home/end press', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
    `
    );
    expect(await getElementFocus(2)).toBeFalsy();

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');
    await waitForStencilLifecycle(page);

    expect(await getElementFocus(2)).toBeTrue();

    await page.keyboard.press('Home');
    await waitForStencilLifecycle(page);

    expect(await getElementFocus(0)).toBeTrue();
    expect(await getElementFocus(2)).toBeFalsy();
  });

  it('should render correct active tab on focus change and enter click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="0">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
    `
    );
    const [firstButton, secondButton] = await getAllButtons();

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
  });

  it('should trigger event on button click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>
    `
    );
    const host = await selectNode(page, 'p-tabs-bar');
    const [firstButton, secondButton, thirdButton] = await getAllButtons();
    let eventCounter = 0;
    await addEventListener(host, 'click', () => eventCounter++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-tabs-bar');

    await firstButton.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(1);

    await secondButton.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(2);

    await thirdButton.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(3);
  });

  it('should render arrow only on horizontal scroll', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
        <button>Content4</button>
        <button>Content5</button>
      </p-tabs-bar>
      <div style="height: 120vh"></div>
    `
    );

    const actionPrev = await getActionPrevContainer();
    const actionNext = await getActionNextContainer();

    await page.evaluate(() => window.scroll(0, 20));
    await waitForStencilLifecycle(page);

    expect(Object.values(await getProperty(actionPrev, 'classList'))).toContain('p-tabs-bar__action--hidden');
    expect(Object.values(await getProperty(actionNext, 'classList'))).toContain('p-tabs-bar__action--hidden');
  });

  it('should only render next button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
        </p-tabs-bar>
      </div>
    `
    );
    const actionPrev = await getActionPrevContainer();
    const actionNext = await getActionNextContainer();

    expect(Object.values(await getProperty(actionNext, 'classList'))).not.toContain('p-tabs-bar__action--hidden');
    expect(Object.values(await getProperty(actionPrev, 'classList'))).toContain('p-tabs-bar__action--hidden');
  });

  it('should only render prev button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar active-tab-index="3" size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
        </p-tabs-bar>
      </div>
    `
    );
    const actionPrev = await getActionPrevContainer();
    const actionNext = await getActionNextContainer();

    expect(Object.values(await getProperty(actionNext, 'classList'))).toContain('p-tabs-bar__action--hidden');
    expect(Object.values(await getProperty(actionPrev, 'classList'))).not.toContain('p-tabs-bar__action--hidden');
  });

  it('should only render prev and next button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs-bar active-tab-index="1" size="medium">
          <button>Content1</button>
          <button>Content2</button>
          <button>Content3</button>
          <button>Content4</button>
          <button>Content5</button>
          <button>Content6</button>
          <button>Content7</button>
        </p-tabs-bar>
      </div>
    `
    );
    const actionNext = await getActionNextContainer();
    const actionPrev = await getActionPrevContainer();

    expect(Object.values(await getProperty(actionNext, 'classList'))).not.toContain('p-tabs-bar__action--hidden');
    expect(Object.values(await getProperty(actionPrev, 'classList'))).not.toContain('p-tabs-bar__action--hidden');
  });

  describe('focus state', () => {
    it('should show outline of slotted <button> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-tabs-bar>
        <button>Content1</button>
        <button>Content2</button>
        <button>Content3</button>
      </p-tabs-bar>`
      );

      const host = await getHost();
      const buttons = await getAllButtons();

      expect(await getStyleOnFocus(buttons[0])).toBe(expectedStyleOnFocus({color: 'active'}));
      expect(await getStyleOnFocus(buttons[1])).toBe(expectedStyleOnFocus());
      expect(await getStyleOnFocus(buttons[2])).toBe(expectedStyleOnFocus());

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(buttons[0])).toBe(expectedStyleOnFocus({color: 'active', theme: 'dark'}));
      expect(await getStyleOnFocus(buttons[1])).toBe(expectedStyleOnFocus({theme: 'dark'}));
      expect(await getStyleOnFocus(buttons[2])).toBe(expectedStyleOnFocus({theme: 'dark'}));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-tabs-bar>
        <a href="#">Content1</a>
        <a href="#">Content2</a>
        <a href="#">Content3</a>
      </p-tabs-bar>`
      );

      const host = await getHost();
      const links = await getAllLinks();

      expect(await getStyleOnFocus(links[0])).toBe(expectedStyleOnFocus({color: 'active'}));
      expect(await getStyleOnFocus(links[1])).toBe(expectedStyleOnFocus());
      expect(await getStyleOnFocus(links[2])).toBe(expectedStyleOnFocus());

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(links[0])).toBe(expectedStyleOnFocus({color: 'active', theme: 'dark'}));
      expect(await getStyleOnFocus(links[1])).toBe(expectedStyleOnFocus({theme: 'dark'}));
      expect(await getStyleOnFocus(links[2])).toBe(expectedStyleOnFocus({theme: 'dark'}));
    });
  });
});
