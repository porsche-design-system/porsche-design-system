import { Page } from 'puppeteer';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  expectA11yToMatchSnapshot,
  getAttribute,
  getLifecycleStatus,
  getOffsetLeft,
  getOffsetWidth,
  getScrollLeft,
  initAddEventListener,
  initConsoleObserver,
  reattachElement,
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
    const steps = Array.from(document.querySelectorAll('p-stepper-horizontal-item'));

    stepper.addEventListener('stepChange', (e) => {
      const { activeStepIndex } = e.detail;

      const newState = [...steps];
      const prevStepIndex = steps.findIndex((step) => step.state === 'current');

      newState[prevStepIndex].state = 'complete';
      newState[activeStepIndex].state = 'current';
    });
    </script>`;

type InitOptions = {
  amount?: number;
  currentStep?: number;
  isWrapped?: boolean;
};

const initStepperHorizontal = async (opts?: InitOptions) => {
  const { amount = 8, currentStep = 0, isWrapped } = opts ?? {};

  const getState = (index: number) =>
    index === currentStep ? 'current' : index < currentStep ? 'complete' : undefined;

  const steps = Array.from(Array(amount))
    .map((_, i) => `<p-stepper-horizontal-item${` state="${getState(i)}"`}>Step ${i + 1}</p-stepper-horizontal-item>`)
    .join('');

  const content = `<p-stepper-horizontal>
  ${steps}
 </p-stepper-horizontal>`;

  await setContentWithDesignSystem(page, isWrapped ? `<div style="width: 300px">${content}</div>` : content);
};

const getHost = () => selectNode(page, 'p-stepper-horizontal');
const getAllStepItems = () => page.$$('p-stepper-horizontal-item');
const getAllButtons = async () =>
  Promise.all(
    (await getAllStepItems()).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );
const getScrollArea = () => selectNode(page, 'p-stepper-horizontal >>> p-scroller >>> .scroll-area');
const getGradientNext = () => selectNode(page, 'p-stepper-horizontal >>> p-scroller >>> .action-next .gradient');

describe('scrolling', () => {
  const FOCUS_PADDING = 8;

  it('should scroll current step into view', async () => {
    await initStepperHorizontal({ currentStep: 3, isWrapped: true });
    const allSteps = await getAllStepItems();
    const selectedButtonOffset = await getOffsetLeft(allSteps[3]);
    const gradientWidth = await getOffsetWidth(await getGradientNext());
    const scrollArea = await getScrollArea();
    const scrollDistance = +selectedButtonOffset - +gradientWidth + FOCUS_PADDING;

    await waitForStencilLifecycle(page);

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

    const [, , , button4, button5] = await getAllButtons();
    const [, , , item4, item5] = await getAllStepItems();
    const gradient = await getGradientNext();
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await button5.click();
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_ANIMATION_DURATION);

    const button5offset = await getOffsetLeft(item5);
    const scrollDistanceRight = +button5offset - +gradientWidth + FOCUS_PADDING;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await button4.click();
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_ANIMATION_DURATION);

    const button4offset = await getOffsetLeft(item4);
    const buttonWidth = await getOffsetWidth(item4);
    const scrollDistanceLeft = +button4offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });
});

describe('events', () => {
  beforeEach(async () => await initAddEventListener(page));

  it('should trigger event on step click', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 2 });
    const host = await getHost();
    const [button1, button2] = await getAllButtons();

    let eventCounter = 0;
    await addEventListener(host, 'stepChange', () => eventCounter++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-stepper-horizontal');

    button1.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(1);

    await button2.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(2);
  });

  it('should not trigger event when clicked in between steps', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 0 });
    initConsoleObserver(page);
    const [firstStep] = await getAllStepItems();

    let eventCounter = 0;

    await page.mouse.click((await getOffsetWidth(firstStep)) + 8, 18);
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if click on current', async () => {
    await initStepperHorizontal({ amount: 3 });
    const [button1] = await getAllButtons();

    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    button1.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item is disabled', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 2 });
    const [, step2] = await getAllStepItems();
    const [, button2] = await getAllButtons();

    await setProperty(step2, 'disabled', true);
    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    button2.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item without state', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 1 });
    const [, , button3] = await getAllButtons();

    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    button3.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init when first step is current', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 0 });

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(11);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init when third step is current', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 2 });

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-stepper-horizontal'], 'componentDidLoad: p-stepper-horizontal').toBe(1);
    expect(status.componentDidLoad['p-stepper-horizontal-item'], 'componentDidLoad: p-stepper-horizontal-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(4);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(13);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 0 });
    const [step1, step2] = await getAllStepItems();

    await setProperty(step1, 'state', 'complete');
    await setProperty(step2, 'state', 'current');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-stepper-horizontal'], 'componentDidUpdate: p-stepper-horizontal').toBe(0);
    expect(
      status.componentDidUpdate['p-stepper-horizontal-item'],
      'componentDidUpdate: p-stepper-horizontal-item'
    ).toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(12);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree of stepper-horizontal', async () => {
    await initStepperHorizontal({ amount: 3 });
    const [button1, button2] = await getAllButtons();

    await expectA11yToMatchSnapshot(page, button1, { message: 'Of Button' });
    expect(await getAttribute(button1, 'aria-current')).toBe('step');
    expect(await getAttribute(button2, 'aria-current')).toBe(null);
  });
});
