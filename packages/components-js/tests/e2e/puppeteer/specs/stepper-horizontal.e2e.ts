import type { Page } from 'puppeteer';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  expectA11yToMatchSnapshot,
  FOCUS_PADDING,
  getAttribute,
  getConsoleErrorsAmount,
  getEventSummary,
  getLifecycleStatus,
  getOffsetLeft,
  getOffsetWidth,
  getPageThrownErrorsAmount,
  getScrollLeft,
  initConsoleObserver,
  initPageErrorObserver,
  reattachElementHandle,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const clickHandlerScript = `
<script>
  const stepper = document.querySelector('p-stepper-horizontal');
  stepper.addEventListener('update', (e) => {
    const { activeStepIndex } = e.detail;
    const stepElements = Array.from(e.target.children);

    const prevStepIndex = stepElements.findIndex((step) => step.state === 'current');

    stepElements[prevStepIndex].state = 'complete';
    stepElements[activeStepIndex].state = 'current';
  });
</script>`;

type InitOptions = {
  amount?: number;
  currentStep?: number;
  isWrapped?: boolean;
};

const initStepperHorizontal = (opts?: InitOptions) => {
  const { amount = 3, currentStep = 0, isWrapped } = opts || {};

  const getState = (index: number) =>
    index === currentStep ? 'current' : index < currentStep ? 'complete' : undefined;

  const steps = Array.from(Array(amount))
    .map(
      (_, i) =>
        `<p-stepper-horizontal-item${getState(i) ? ` state="${getState(i)}"` : ''}>Step ${
          i + 1
        }</p-stepper-horizontal-item>`
    )
    .join('');

  const content = `<p-stepper-horizontal>
  ${steps}
 </p-stepper-horizontal>`;

  return setContentWithDesignSystem(page, isWrapped ? `<div style="width: 300px">${content}</div>` : content);
};

const getHost = () => selectNode(page, 'p-stepper-horizontal');
const getStepItems = () => page.$$('p-stepper-horizontal-item');
const getButtons = async () =>
  Promise.all(
    (await getStepItems()).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );
const getScrollArea = () => selectNode(page, 'p-stepper-horizontal >>> p-scroller >>> .scroll-area');
const getGradientNext = () => selectNode(page, 'p-stepper-horizontal >>> p-scroller >>> .action-next');

describe('validation', () => {
  it('should throw error if an item with current state is added while another exists', async () => {
    await initPageErrorObserver(page);

    await initStepperHorizontal();
    expect(getPageThrownErrorsAmount()).toBe(0);

    const host = await getHost();
    await host.evaluate((host: HTMLElement) => {
      const newStepperHorizontalItem = document.createElement('p-stepper-horizontal-item') as any;
      newStepperHorizontalItem.state = 'current';
      host.appendChild(newStepperHorizontalItem);
    });
    await waitForStencilLifecycle(page);

    expect(getPageThrownErrorsAmount()).toBe(1);
  });

  it('should throw error if a second current state is defined', async () => {
    await initConsoleObserver(page);

    await initStepperHorizontal();
    const [, item2] = await getStepItems();

    await setProperty(item2, 'state', 'current');
    await waitForStencilLifecycle(page);

    expect(getConsoleErrorsAmount()).toBe(1);
  });

  it('should not throw error if an items state previous to the current one is set as current and the current one is set to undefined', async () => {
    await initPageErrorObserver(page);
    await initConsoleObserver(page);

    await initStepperHorizontal({ currentStep: 3 });
    const host = await getHost();

    await host.evaluate((host: HTMLElement) => {
      const stepperItemElements = Array.from(host.children) as any;
      stepperItemElements[1].state = 'current';
      stepperItemElements[2].state = undefined;
    });
    await waitForStencilLifecycle(page);

    expect(getPageThrownErrorsAmount()).toBe(0);
    expect(getConsoleErrorsAmount()).toBe(0);
  });
});

describe('scrolling', () => {
  it('should scroll current step into view', async () => {
    await initStepperHorizontal({ amount: 9, currentStep: 3, isWrapped: true });
    const [, , , step4] = await getStepItems();
    const step4Offset = await getOffsetLeft(step4);
    const gradientWidth = await getOffsetWidth(await getGradientNext());
    const scrollArea = await getScrollArea();
    const scrollDistance = step4Offset - gradientWidth + FOCUS_PADDING;

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should scroll to correct position on step click', async () => {
    await setContentWithDesignSystem(
      page,
      `<div style="width: 300px">
  <p-stepper-horizontal>
    <p-stepper-horizontal-item state="current">Step 1</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 2</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 3</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 4</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 5</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 6</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 7</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 8</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 9</p-stepper-horizontal-item>
  </p-stepper-horizontal>
</div>${clickHandlerScript}`
    );

    const [, , , item4, item5] = await getStepItems();
    const gradient = await getGradientNext();
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await item5.click();
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const item5Offset = await getOffsetLeft(item5);
    const scrollDistanceRight = item5Offset - gradientWidth + FOCUS_PADDING;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await item4.click();
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const item4Offset = await getOffsetLeft(item4);
    const item4Width = await getOffsetWidth(item4);
    const scrollDistanceLeft = item4Offset + item4Width + gradientWidth - scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should scroll to correct position when current step item changes', async () => {
    await initStepperHorizontal({ amount: 9, isWrapped: true });

    const [item1, , , item4, item5] = await getStepItems();
    const gradient = await getGradientNext();
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    await setProperty(item1, 'state', 'complete');
    await setProperty(item5, 'state', 'current');
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const item5Offset = await getOffsetLeft(item5);
    const scrollDistanceRight = item5Offset - gradientWidth + FOCUS_PADDING;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await setProperty(item5, 'state', 'complete');
    await setProperty(item4, 'state', 'current');
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const item4Offset = await getOffsetLeft(item4);
    const item4Width = await getOffsetWidth(item4);
    const scrollDistanceLeft = item4Offset + item4Width + gradientWidth - scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should scroll to correct position if one item is removed', async () => {
    await initStepperHorizontal({ amount: 9, currentStep: 4, isWrapped: true });
    const host = await getHost();
    const [, , , , item5] = await getStepItems();

    await host.evaluate((host) => {
      host.removeChild(host.firstChild);
    });
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const gradient = await getGradientNext();
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    const item5Offset = await getOffsetLeft(item5);
    const item5Width = await getOffsetWidth(item5);
    const scrollDistanceLeft = item5Offset + item5Width + gradientWidth - scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should scroll to correct position if newly added item is set to current', async () => {
    await initStepperHorizontal({ amount: 5, currentStep: 0, isWrapped: true });
    const host = await getHost();

    await host.evaluate((host) => {
      const newStepperHorizontalItem = document.createElement('p-stepper-horizontal-item');
      newStepperHorizontalItem.innerText = 'Step 6';
      host.appendChild(newStepperHorizontalItem);
    });
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const [item1, , , , , item6] = await getStepItems();

    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    await setProperty(item1, 'state', 'complete');
    await setProperty(item6, 'state', 'current');
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

    const item6Offset = await getOffsetLeft(item6);
    const item6Width = await getOffsetWidth(item6);
    const scrollDistanceLeft = item6Offset + item6Width + FOCUS_PADDING - scrollAreaWidth;
    expect((await getScrollLeft(scrollArea)) - 1).toEqual(scrollDistanceLeft);
  });
});

describe('events', () => {
  it('should trigger event on step click', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const host = await getHost();
    const [item1, item2] = await getStepItems();

    await addEventListener(host, 'stepChange');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);

    await item2.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(2);
  });

  it('should not trigger event when clicked in between steps', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const host = await getHost();
    const [item1] = await getStepItems();

    await addEventListener(host, 'stepChange');

    await page.mouse.click((await getOffsetWidth(item1)) + 6, 18);
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);
  });

  it('should not trigger event if click on current', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const host = await getHost();
    const [item1, , item3] = await getStepItems();

    await addEventListener(host, 'stepChange');

    await item3.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);
  });

  it('should not trigger event if item is disabled', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const host = await getHost();
    const [item1, item2] = await getStepItems();

    await setProperty(item2, 'disabled', true);
    await waitForStencilLifecycle(page);

    await addEventListener(host, 'stepChange');

    await item2.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);
  });

  it('should not trigger event if item without state', async () => {
    await initStepperHorizontal({ currentStep: 1 });
    const host = await getHost();
    const [item1, , item3] = await getStepItems();

    await addEventListener(host, 'stepChange');

    await item3.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);
  });

  it('should emit both stepChange and update event', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const host = await getHost();

    await addEventListener(host, 'stepChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const [item1] = await getStepItems();
    await item1.click();
    expect((await getEventSummary(host, 'stepChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init when first step is current', async () => {
    await initStepperHorizontal({ currentStep: 0 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init when third step is current', async () => {
    await initStepperHorizontal({ currentStep: 2 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(4);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initStepperHorizontal({ currentStep: 0 });
    const host = await getHost();

    await host.evaluate((host: HTMLElement) => {
      const stepperItemElements = Array.from(host.children) as any;
      stepperItemElements[0].state = 'complete';
      stepperItemElements[1].state = 'current';
    });
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);
    expect(status.componentDidUpdate['p-stepper-horizontal'], 'componentDidUpdate: p-stepper-horizontal').toBe(1);
    expect(
      status.componentDidUpdate['p-stepper-horizontal-item'],
      'componentDidUpdate: p-stepper-horizontal-item'
    ).toBe(3);
    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree of stepper-horizontal', async () => {
    await initStepperHorizontal({ amount: 3 });
    const host = await getHost();
    const [button1, button2] = await getButtons();

    await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
    expect(await getAttribute(button1, 'aria-current')).toBe('step');
    expect(await getAttribute(button2, 'aria-current')).toBe(null);
  });
});
