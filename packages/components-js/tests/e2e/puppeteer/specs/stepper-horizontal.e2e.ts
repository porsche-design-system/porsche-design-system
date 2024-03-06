import type { Page } from 'puppeteer';
import { expectA11yToMatchSnapshot, getAttribute, selectNode, setContentWithDesignSystem } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

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
