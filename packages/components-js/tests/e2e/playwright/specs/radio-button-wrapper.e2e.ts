import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  clickElementPosition,
  getActiveElementId,
  getActiveElementTagName,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import type { FormState } from '@porsche-design-system/components';

const getHost = (page: Page) => page.$('p-radio-button-wrapper');
const getInput = (page: Page) => page.$('p-radio-button-wrapper input');
const getWrapper = (page: Page) => page.$('p-radio-button-wrapper .wrapper');
const getMessage = (page: Page) => page.$('p-radio-button-wrapper .message');
const getBackgroundStyle = (element: ElementHandle<HTMLElement | SVGElement>) => getElementStyle(element, 'background');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  loading?: boolean;
};

const initRadioButton = (page: Page, opts?: InitOptions): Promise<void> => {
  const { useSlottedLabel = false, useSlottedMessage = false, state = 'none', loading = false } = opts || {};

  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  const attrs = [!useSlottedLabel && 'label="Some label"', `state=${state}`, loading && 'loading="true"']
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-radio-button-wrapper ${attrs}>
      ${slottedLabel}
      <input type="radio" />
      ${slottedMessage}
    </p-radio-button-wrapper>`
  );
};

test('should add/remove message text if state changes programmatically', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <p-radio-button-wrapper label="Some label">
      <input type="radio" name="some-name" />
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>`
  );

  const host = await getHost(page);

  expect(await getMessage(page), 'initially').toBeNull();

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);

  expect(await getMessage(page), 'when state = error').toBeDefined();

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message');
  await waitForStencilLifecycle(page);

  expect(await getMessage(page), 'when state = success').toBeDefined();

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  expect(await getMessage(page), 'when state = none').toBeNull();
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should disable radio-button when disabled property is set programmatically', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <p-radio-button-wrapper label="Some label" id="radio-1">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>`
    );

    const host = await getHost(page);
    const input = await getInput(page);
    const wrapper = await getWrapper(page);

    const getWrapperCursor = () => getElementStyle(wrapper, 'cursor');
    const getInputCursor = () => getElementStyle(input, 'cursor');
    const getInputPointerEvents = () => getElementStyle(input, 'pointerEvents');

    expect(await getWrapperCursor()).toBe('auto');
    expect(await getInputCursor()).toBe('pointer');
    expect(await getInputPointerEvents()).toBe('auto');

    await setProperty(input, 'disabled', true);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('not-allowed');
    expect(await getInputCursor()).toBe('default');
    expect(await getInputPointerEvents()).toBe('none'); // prevents radio-button from being clickable in disabled and especially loading state

    await setProperty(input, 'disabled', false);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('auto');
    expect(await getInputCursor()).toBe('pointer');
    expect(await getInputPointerEvents()).toBe('auto');

    await setProperty(host, 'loading', true);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('not-allowed');
    expect(await getInputCursor()).toBe('default');
    expect(await getInputPointerEvents()).toBe('none'); // prevents radio-button from being clickable in disabled and especially loading state
  });
});

test.describe('checked state', () => {
  test('should check radio-button when input is clicked', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>`
    );

    const input1 = await page.$('#radio-1 > input[type="radio"]');
    const input2 = await page.$('#radio-2 > input[type="radio"]');

    const initialStyleInput1 = await getBackgroundStyle(input1);
    const initialStyleInput2 = await getBackgroundStyle(input2);

    expect(initialStyleInput1).toEqual(initialStyleInput2);

    await input1.click();
    await waitForStencilLifecycle(page);

    expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
    expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

    await input2.click();
    await waitForStencilLifecycle(page);

    expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
    expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
  });

  test('should check radio-button when label text is clicked', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input id="radio-1-input" type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input id="radio-2-input" type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const input1 = await page.$('#radio-1 > input[type="radio"]');
    const input2 = await page.$('#radio-2 > input[type="radio"]');
    const label1 = await page.$('#radio-1 label');
    const label2 = await page.$('#radio-2 label');
    const initialStyleInput1 = await getBackgroundStyle(input1);
    const initialStyleInput2 = await getBackgroundStyle(input2);

    expect(initialStyleInput1).toEqual(initialStyleInput2);
    expect(await getActiveElementId(page)).toBe('');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await label1.click();
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
    expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await label2.click();
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
    expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
    expect(await getActiveElementTagName(page)).toBe('BODY');
  });

  test('should check radio-button when checked attribute is changed programmatically', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>`
    );

    const input1 = await page.$('#radio-1 > input');
    const input2 = await page.$('#radio-2 > input');
    const initialStyleInput1 = await getBackgroundStyle(input1);
    const initialStyleInput2 = await getBackgroundStyle(input2);

    expect(initialStyleInput1).toEqual(initialStyleInput2);

    await setProperty(input1, 'checked', true);
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
    expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

    await setProperty(input2, 'checked', true);
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
    expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
  });

  test('should not toggle radio-button on click in loading state', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" loading="true" id="radio-1">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name" checked />
      </p-radio-button-wrapper>`
    );
    const host1 = await page.$('#radio-1');
    const input1 = await page.$('#radio-1 > input');
    await addEventListener(host1, 'click');
    await addEventListener(input1, 'change');

    await clickElementPosition(page, input1);
    const coords = await host1.boundingBox();
    await page.mouse.click(coords.x + 1, coords.y + 1); // click the top left corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // click the bottom left corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // click the top right corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // click the bottom right corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // click the left center
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // click the right center
    await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // click the center center

    expect((await getEventSummary(host1, 'click')).counter).toBe(8);
    expect((await getEventSummary(input1, 'change')).counter).toBe(0);

    await setProperty(host1, 'loading', false);
    await waitForStencilLifecycle(page);

    await clickElementPosition(page, input1);
    expect((await getEventSummary(host1, 'click')).counter).toBe(9);
    expect((await getEventSummary(input1, 'change')).counter).toBe(1);
  });

  skipInBrowsers(['webkit'], () => {
    test('should keep focus if state switches to loading', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>`
      );
      const host1 = await page.$('#radio-1');
      const input1 = await page.$('#radio-1 > input');

      expect(await hasFocus(input1)).toBe(false);
      await page.keyboard.press('Tab');
      expect(await hasFocus(input1), 'after Tab').toBe(true);

      await setProperty(host1, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(input1), 'focus when loading').toBe(true);

      await setProperty(host1, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(input1), 'final focus').toBe(true);
    });
  });
});

test('should check radio-button when checked property is changed programmatically', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <p-radio-button-wrapper label="Some label" id="radio-1">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" id="radio-2">
      <input type="radio" name="some-name" />
    </p-radio-button-wrapper>`
  );

  const input1 = await page.$('#radio-1 > input');
  const input2 = await page.$('#radio-2 > input');
  const initialStyleInput1 = await getBackgroundStyle(input1);
  const initialStyleInput2 = await getBackgroundStyle(input2);

  expect(initialStyleInput1).toEqual(initialStyleInput2);

  await setProperty(input1, 'checked', true);
  await waitForInputTransition(page);

  expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
  expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

  await setProperty(input2, 'checked', true);
  await waitForInputTransition(page);

  expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
  expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initRadioButton(page, { useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-radio-button-wrapper'], 'componentDidLoad: p-radio-button-wrapper').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initRadioButton(page, { useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const input = await getInput(page);

    await input.click();
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
