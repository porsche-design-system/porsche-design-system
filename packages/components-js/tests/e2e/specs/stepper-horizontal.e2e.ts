import { Page } from 'puppeteer';
import {
  addEventListener,
  getAttribute,
  getProperty,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

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

describe('scrolling', () => {
  it('should scroll current step into view', async () => {});

  it('should not throw error when clicked between steps', async () => {});

  it('should scroll current step to correct position direction next', async () => {});

  it('should scroll current step to correct position direction prev', async () => {});
});

describe('onClick', () => {});

describe('events', () => {
  beforeEach(async () => await initAddEventListener(page));

  it('should trigger event on button click', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 2 });
    const host = await getHost();
    const [buttonOne, buttonTwo, buttonThree] = await getAllButtons();

    let eventCounter = 0;
    await addEventListener(host, 'stepChange', () => eventCounter++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-stepper-horizontal');

    buttonOne.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(1);

    await buttonTwo.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(2);
  });

  it('should not trigger event if click on current', async () => {
    await initStepperHorizontal({ amount: 3 });
    const [buttonOne] = await getAllButtons();

    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    buttonOne.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item is disabled', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 2 });
    const [, stepTwo] = await getAllStepItems();
    const [, buttonTwo] = await getAllButtons();

    await setProperty(stepTwo, 'disabled', true);
    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    buttonTwo.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item without state', async () => {
    await initStepperHorizontal({ amount: 3, currentStep: 1 });
    const [, , buttonThree] = await getAllButtons();

    await waitForStencilLifecycle(page);

    let eventCounter = 0;

    buttonThree.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {});

  it('should work without unnecessary round trips on prop change', async () => {});

  it('should work without unnecessary round trips when step is added / removed', async () => {});
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree of stepper-horizontal', async () => {});
});
