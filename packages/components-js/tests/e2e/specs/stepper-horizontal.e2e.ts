import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  FOCUS_PADDING,
  getConsoleErrorsAmount,
  getEventSummary,
  getLifecycleStatus,
  getOffsetLeft,
  getOffsetWidth,
  getPageThrownErrorsAmount,
  initConsoleObserver,
  initPageErrorObserver,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

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

const initStepperHorizontal = (page: Page, opts?: InitOptions) => {
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

const getHost = (page: Page) => page.locator('p-stepper-horizontal');
const getStepItems = (page: Page) => page.locator('p-stepper-horizontal-item').all();
const getButtons = async (page: Page) =>
  Promise.all(
    (await getStepItems(page)).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );
const getScrollArea = (page: Page) => page.locator('p-stepper-horizontal p-scroller .scroll-area');
const getGradientNext = (page: Page) => page.locator('p-stepper-horizontal p-scroller .action-next');

test.describe('validation', () => {
  test('should throw error if an item with current state is added while another exists', async ({ page }) => {
    await initPageErrorObserver(page);

    await initStepperHorizontal(page);
    expect(getPageThrownErrorsAmount()).toBe(0);

    const host = getHost(page);
    await host.evaluate((host: HTMLElement) => {
      const newStepperHorizontalItem = document.createElement('p-stepper-horizontal-item') as any;
      newStepperHorizontalItem.state = 'current';
      host.appendChild(newStepperHorizontalItem);
    });
    await waitForStencilLifecycle(page);

    expect(getPageThrownErrorsAmount()).toBe(1);
  });

  test('should throw error if a second current state is defined', async ({ page }) => {
    initConsoleObserver(page);

    await initStepperHorizontal(page);
    const [, item2] = await getStepItems(page);

    await setProperty(item2, 'state', 'current');
    await waitForStencilLifecycle(page);

    await expect.poll(() => getConsoleErrorsAmount()).toBe(1);
  });

  test('should not throw error if an items state previous to the current one is set as current and the current one is set to undefined', async ({
    page,
  }) => {
    initPageErrorObserver(page);
    initConsoleObserver(page);

    await initStepperHorizontal(page, { currentStep: 3 });
    const host = getHost(page);

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

test.describe('scrolling', () => {
  test('should scroll current step into view', async ({ page }) => {
    await initStepperHorizontal(page, { amount: 9, currentStep: 3, isWrapped: true });
    const [, , , step4] = await getStepItems(page);
    const step4Offset = await getOffsetLeft(step4);
    const gradientWidth = await getOffsetWidth(getGradientNext(page));
    const scrollArea = getScrollArea(page);
    const scrollDistance = step4Offset - gradientWidth + FOCUS_PADDING;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistance);
  });

  test('should scroll to correct position on step click', async ({ page }) => {
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

    const [, , , item4, item5] = await getStepItems(page);
    const gradient = getGradientNext(page);
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = getScrollArea(page);
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    await expect(scrollArea).toHaveJSProperty('scrollLeft', 0);

    await item5.click();
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    const item5Offset = await getOffsetLeft(item5);
    const scrollDistanceRight = item5Offset - gradientWidth + FOCUS_PADDING;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceRight);

    await item4.click();
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    const item4Offset = await getOffsetLeft(item4);
    const item4Width = await getOffsetWidth(item4);
    const scrollDistanceLeft = item4Offset + item4Width + gradientWidth - scrollAreaWidth;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceLeft);
  });

  test('should scroll to correct position when current step item changes', async ({ page }) => {
    await initStepperHorizontal(page, { amount: 9, isWrapped: true });

    const [item1, , , item4, item5] = await getStepItems(page);
    const gradient = getGradientNext(page);
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = getScrollArea(page);
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    await setProperty(item1, 'state', 'complete');
    await setProperty(item5, 'state', 'current');
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    const item5Offset = await getOffsetLeft(item5);
    const scrollDistanceRight = item5Offset - gradientWidth + FOCUS_PADDING;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceRight);

    await setProperty(item5, 'state', 'complete');
    await setProperty(item4, 'state', 'current');
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    const item4Offset = await getOffsetLeft(item4);
    const item4Width = await getOffsetWidth(item4);
    const scrollDistanceLeft = item4Offset + item4Width + gradientWidth - scrollAreaWidth;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceLeft);
  });

  test('should scroll to correct position if one item is removed', async ({ page }) => {
    await initStepperHorizontal(page, { amount: 9, currentStep: 4, isWrapped: true });
    const host = getHost(page);
    const [, , , , item5] = await getStepItems(page);

    await host.evaluate((host) => {
      host.removeChild(host.firstChild);
    });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    const gradient = getGradientNext(page);
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = getScrollArea(page);
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    const item5Offset = await getOffsetLeft(item5);
    const item5Width = await getOffsetWidth(item5);
    const scrollDistanceLeft = item5Offset + item5Width + gradientWidth - scrollAreaWidth;
    await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceLeft);
  });

  // TODO: Different values in pipeline than locally
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should scroll to correct position if newly added item is set to current', async ({ page }) => {
      await initStepperHorizontal(page, { amount: 5, currentStep: 0, isWrapped: true });
      const host = getHost(page);

      await host.evaluate((host) => {
        const newStepperHorizontalItem = document.createElement('p-stepper-horizontal-item');
        newStepperHorizontalItem.innerText = 'Step 6';
        host.appendChild(newStepperHorizontalItem);
      });
      await waitForStencilLifecycle(page);
      await sleep(CSS_ANIMATION_DURATION);

      const [item1, , , , , item6] = await getStepItems(page);

      const scrollArea = getScrollArea(page);
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      await setProperty(item1, 'state', 'complete');
      await setProperty(item6, 'state', 'current');
      await waitForStencilLifecycle(page);
      await sleep(CSS_ANIMATION_DURATION);

      const item6Offset = await getOffsetLeft(item6);
      const item6Width = await getOffsetWidth(item6);
      const scrollDistanceLeft = item6Offset + item6Width + FOCUS_PADDING - scrollAreaWidth;
      await expect(scrollArea).toHaveJSProperty('scrollLeft', scrollDistanceLeft);
    });
  });
});

test.describe('events', () => {
  test('should trigger update event on step click', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 2 });
    const host = getHost(page);
    const [item1, item2] = await getStepItems(page);

    await addEventListener(host, 'update');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(host);

    await item1.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);

    await item2.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(2);
  });

  test('should not trigger update event when clicked in between steps', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 2 });
    const host = getHost(page);
    const [item1] = await getStepItems(page);

    await addEventListener(host, 'update');

    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await page.mouse.click((await getOffsetWidth(item1)) + 3, 18);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  test('should not trigger update event if click on current', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 2 });
    const host = getHost(page);
    const [item1, , item3] = await getStepItems(page);

    await addEventListener(host, 'update');

    await item3.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  test('should not trigger update event if item is disabled', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 2 });
    const host = getHost(page);
    const [item1, item2] = await getStepItems(page);

    await setProperty(item2, 'disabled', true);
    await waitForStencilLifecycle(page);

    await addEventListener(host, 'update');

    await item2.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  test('should not trigger update event if item without state', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 1 });
    const host = getHost(page);
    const [item1, , item3] = await getStepItems(page);

    await addEventListener(host, 'update');

    await item3.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await item1.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init when first step is current', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 0 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init when third step is current', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 2 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(4);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(11);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initStepperHorizontal(page, { currentStep: 0 });
    const host = getHost(page);

    await host.evaluate((host: HTMLElement) => {
      const stepperItemElements = Array.from(host.children) as any;
      stepperItemElements[0].state = 'complete';
      stepperItemElements[1].state = 'current';
    });
    await waitForStencilLifecycle(page);

    await expect.poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-stepper-horizontal']).toBe(1);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-stepper-horizontal-item'])
      .toBe(2);
    await expect.poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-scroller']).toBe(0);

    await expect.poll(async () => (await getLifecycleStatus(page)).componentDidLoad.all).toBe(10);
    await expect.poll(async () => (await getLifecycleStatus(page)).componentDidUpdate.all).toBe(3);
  });
});
