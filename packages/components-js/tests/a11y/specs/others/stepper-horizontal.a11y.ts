import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem } from '../../helpers';

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

test('should expose correct initial accessibility tree of stepper-horizontal', async ({ page }) => {
  await initStepperHorizontal(page, { amount: 3 });
  const host = getHost(page);
  const [button1, button2] = await getButtons(page);

  // await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
  expect(await getAttribute(button1, 'aria-current')).toBe('step');
  expect(await getAttribute(button2, 'aria-current')).toBe(null);
});
