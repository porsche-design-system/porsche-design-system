import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-checkbox-wrapper');
const getRoot = () => selectNode(page, 'p-checkbox-wrapper >>> .root');
const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
const getWrapper = () => selectNode(page, 'p-checkbox-wrapper >>> .wrapper');
const getLabel = () => selectNode(page, 'p-checkbox-wrapper >>> label');
const getMessage = () => selectNode(page, 'p-checkbox-wrapper >>> .message');

const setIndeterminate = async (element: ElementHandle, value: boolean) => {
  await setProperty(element, 'indeterminate', value);
};

const setChecked = async (element: ElementHandle, value: boolean) => {
  await setProperty(element, 'checked', value);
};

const getBackgroundImage = (input: ElementHandle) => getElementStyle(input, 'backgroundImage');
const backgroundURL = 'url("data:image';

type InitOptions = {
  label?: string;
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  loading?: boolean;
};

const initCheckbox = (opts?: InitOptions): Promise<void> => {
  const {
    label = 'Some Label',
    useSlottedLabel = false,
    useSlottedMessage = false,
    state = 'none',
    loading = false,
  } = opts || {};

  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  const attrs = [!useSlottedLabel && `label="${label}"`, `state="${state}"`, loading && 'loading="true"']
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-checkbox-wrapper ${attrs}>
      ${slottedLabel}
      <input type="checkbox" />
      ${slottedMessage}
    </p-checkbox-wrapper>`
  );
};

it('should add/remove message text with message if state changes programmatically', async () => {
  await initCheckbox();
  const host = await getHost();
  expect(await getMessage(), 'initially').toBeNull();

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);

  expect(await getMessage(), 'when state = error').toBeDefined();

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message');
  await waitForStencilLifecycle(page);

  expect(await getMessage(), 'when state = success').toBeDefined();

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  expect(await getMessage(), 'when state = none').toBeNull();
});

it('should toggle checkbox when input is clicked', async () => {
  await initCheckbox();
  const input = await getInput();

  expect(await getBackgroundImage(input)).toBe('none');

  await input.click();

  const checkedImage = await getBackgroundImage(input);
  expect(checkedImage).toContain(backgroundURL);

  await input.click();
  expect(await getBackgroundImage(input)).toBe('none');

  // ensure that checked and indeterminate use different images
  await setIndeterminate(input, true);
  expect(checkedImage).not.toBe(await getBackgroundImage(input));
});

it('should not toggle checkbox on click in loading state', async () => {
  await initCheckbox({ loading: true });
  const host = await getHost();
  const input = await getInput();
  await addEventListener(host, 'click');
  await addEventListener(input, 'change');

  await input.click();
  const coords = await host.boundingBox();
  await page.mouse.click(coords.x + 1, coords.y + 1); // click the top left corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // click the bottom left corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // click the top right corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // click the bottom right corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // click the left center
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // click the right center
  await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // click the center center

  expect((await getEventSummary(host, 'click')).counter).toBe(8);
  expect((await getEventSummary(input, 'change')).counter).toBe(0);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  await input.click();
  expect((await getEventSummary(host, 'click')).counter).toBe(9);
  expect((await getEventSummary(input, 'change')).counter).toBe(1);
});

it('should not toggle checkbox when pressed space in focus in loading state', async () => {
  await initCheckbox({ loading: true });
  const host = await getHost();
  const input = await getInput();
  await addEventListener(input, 'change');

  await input.focus();
  expect(await getActiveElementTagName(page)).toBe('INPUT');

  await page.keyboard.press('Space');
  expect((await getEventSummary(input, 'change')).counter).toBe(0);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  await page.keyboard.press('Space');
  expect((await getEventSummary(input, 'change')).counter).toBe(1);
});

it('should keep focus if state switches to loading', async () => {
  await initCheckbox();
  const input = await getInput();
  const host = await getHost();

  expect(await hasFocus(input)).toBe(false);
  await page.keyboard.press('Tab');
  expect(await hasFocus(input), 'after Tab').toBe(true);

  await setProperty(host, 'loading', true);
  await waitForStencilLifecycle(page);

  expect(await hasFocus(input), 'focus when loading').toBe(true);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  expect(await hasFocus(input), 'final focus').toBe(true);
});

it('should toggle checkbox when label text is clicked and not set input as active element', async () => {
  await initCheckbox();
  const label = await getLabel();
  const input = await getInput();
  const isInputChecked = (): Promise<boolean> => getProperty(input, 'checked');

  expect(await isInputChecked()).toBe(false);
  expect(await getActiveElementTagName(page)).not.toBe('INPUT');

  await label.click();
  await waitForStencilLifecycle(page);

  expect(await isInputChecked()).toBe(true);
  expect(await getActiveElementTagName(page)).toBe('BODY');

  await label.click();
  await waitForStencilLifecycle(page);

  expect(await isInputChecked()).toBe(false);
  expect(await getActiveElementTagName(page)).toBe('BODY');
});

it('should check/uncheck checkbox when checkbox attribute is changed programmatically', async () => {
  await initCheckbox();
  const input = await getInput();

  expect(await getBackgroundImage(input)).toBe('none');

  await setProperty(input, 'checked', true);
  expect(await getBackgroundImage(input)).toContain(backgroundURL);

  await setProperty(input, 'checked', false);
  expect(await getBackgroundImage(input)).toBe('none');
});

it('should check/uncheck checkbox when checkbox property is changed programmatically', async () => {
  await initCheckbox();
  const input = await getInput();

  expect(await getBackgroundImage(input)).toBe('none');

  await setProperty(input, 'checked', true);
  expect(await getBackgroundImage(input)).toContain(backgroundURL);

  await setProperty(input, 'checked', false);
  expect(await getBackgroundImage(input)).toBe('none');
});

it('should disable checkbox when disabled property is set programmatically', async () => {
  await initCheckbox();
  const host = await getHost();
  const input = await getInput();
  const wrapper = await getWrapper();

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
  expect(await getInputPointerEvents()).toBe('none'); // prevents checkbox from being toggleable in disabled and especially loading state

  await setProperty(input, 'disabled', false);
  await waitForInputTransition(page);

  expect(await getWrapperCursor()).toBe('auto');
  expect(await getInputCursor()).toBe('pointer');
  expect(await getInputPointerEvents()).toBe('auto');

  await setProperty(host, 'loading', true);
  await waitForInputTransition(page);

  expect(await getWrapperCursor()).toBe('not-allowed');
  expect(await getInputCursor()).toBe('default');
  expect(await getInputPointerEvents()).toBe('none'); // prevents checkbox from being toggleable in disabled and especially loading state
});

describe('indeterminate state', () => {
  it('should show indeterminate state when checkbox is set to indeterminate', async () => {
    await initCheckbox();
    const input = await getInput();

    expect(await getBackgroundImage(input)).toBe('none');

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setIndeterminate(input, false);
    expect(await getBackgroundImage(input)).toBe('none');
  });

  it('should remove indeterminate state when checkbox value is changed by the user', async () => {
    await initCheckbox();
    const input = await getInput();

    await setIndeterminate(input, true);
    const indeterminateImage = await getBackgroundImage(input);
    expect(indeterminateImage, 'first indeterminate set').toContain(backgroundURL);

    // checked Image is set
    await input.click();
    const checkedImage = await getBackgroundImage(input);
    expect(checkedImage, 'first click').toContain(backgroundURL);
    expect(indeterminateImage).not.toBe(checkedImage);

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input), 'second indeterminate set').toContain(backgroundURL);

    await input.click();
    expect(await getBackgroundImage(input), 'second click').toBe('none');
  });

  it('should keep indeterminate state when checkbox value is changed programmatically', async () => {
    await initCheckbox();
    const input = await getInput();

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setChecked(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setChecked(input, false);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const input = await getInput();

    await input.click();
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-checkbox-wrapper'], 'componentDidUpdate: p-checkbox-wrapper').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initCheckbox();
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label" message="Some error message." state="error">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
    );
    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
    );

    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = none' });
  });

  it('should expose correct accessibility tree when loading=true', async () => {
    await initCheckbox({ loading: true });
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });
});
