import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
  getElementInnerText,
  getElementStyle,
  setAttribute,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-textarea-wrapper');
const getTextarea = () => selectNode(page, 'p-textarea-wrapper textarea');
const getMessage = () => selectNode(page, 'p-textarea-wrapper >>> .message');
const getLabel = () => selectNode(page, 'p-textarea-wrapper >>> .label__text');
const getCounter = () => selectNode(page, 'p-textarea-wrapper >>> .counter');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  hasLabel?: boolean;
  maxLength?: number;
};

const initTextarea = (opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
    hasLabel = false,
    maxLength,
  } = opts ?? {};

  const link = '<a href="#" onclick="return false;">link</a>';
  const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
  const slottedDescription = useSlottedDescription ? `<span slot="description">Description with a ${link}</span>` : '';
  const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

  const attrs = [`state="${state}"`, hasLabel && 'label="Some label"'].filter((x) => x).join(' ');

  return setContentWithDesignSystem(
    page,
    `
        <p-textarea-wrapper ${attrs}>
          ${slottedLabel}
          ${slottedDescription}
          <textarea${maxLength ? ` maxlength="${maxLength}"` : ''}></textarea>
          ${slottedMessage}
        </p-textarea-wrapper>`
  );
};

it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
  await initTextarea();
  const host = await getHost();

  expect(await getLabel()).toBeNull();

  await setProperty(host, 'label', 'Some label');
  await waitForStencilLifecycle(page);

  expect(await getLabel()).toBeDefined();
});

it('should focus textarea when label is clicked', async () => {
  await initTextarea({ hasLabel: true });
  const label = await getLabel();
  const textarea = await getTextarea();

  let textareaFocusSpyCalls = 0;
  await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

  expect(textareaFocusSpyCalls).toBe(0);

  await label.click();
  await waitForStencilLifecycle(page);

  expect(textareaFocusSpyCalls).toBe(1);
});

it('should focus textarea when counter text is clicked', async () => {
  await initTextarea({ maxLength: 160 });
  const counter = await getCounter();
  const textarea = await getTextarea();

  let textareaFocusSpyCalls = 0;
  await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

  expect(textareaFocusSpyCalls).toBe(0);

  await counter.click();
  await waitForStencilLifecycle(page);

  expect(textareaFocusSpyCalls).toBe(1);
});

it('should display correct counter when typing', async () => {
  await initTextarea({ maxLength: 160 });
  const counter = await getCounter();
  const textarea = await getTextarea();

  expect(await getElementInnerText(counter)).toBe('0/160');
  await textarea.type('h');
  expect(await getElementInnerText(counter)).toBe('1/160');
  await textarea.type('ello');
  expect(await getElementInnerText(counter)).toBe('5/160');
  await textarea.press('Backspace');
  expect(await getElementInnerText(counter)).toBe('4/160');
  await textarea.press('Backspace');
  await textarea.press('Backspace');
  await textarea.press('Backspace');
  await textarea.press('Backspace');
  expect(await getElementInnerText(counter)).toBe('0/160');
});

it('should render characterCountElement when maxlength is set', async () => {
  await initTextarea();
  const textarea = await getTextarea();

  expect(await selectNode(page, 'p-textarea-wrapper >>> label .sr-only')).toBeNull();

  await setAttribute(textarea, 'maxlength', '20');

  expect(await selectNode(page, 'p-textarea-wrapper >>> label .sr-only')).toBeDefined();
});

describe('hover state', () => {
  const getBorderColor = (element: ElementHandle) => getElementStyle(element, 'borderColor');
  const defaultColor = 'rgb(98, 102, 105)';
  const hoverColor = 'rgb(0, 0, 0)';

  it('should show hover state on input when label is hovered', async () => {
    await initTextarea({ hasLabel: true });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = await getLabel();
    const textarea = await getTextarea();

    const initialStyle = await getBorderColor(textarea);
    expect(initialStyle).toBe(defaultColor);
    await textarea.hover();
    const hoverStyle = await getBorderColor(textarea);
    expect(hoverStyle).toBe(hoverColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(textarea)).toBe(defaultColor);

    await label.hover();
    expect(await getBorderColor(textarea)).toBe(hoverColor);
  });

  it('should show hover state on textarea when counter is hovered', async () => {
    await initTextarea({ maxLength: 160 });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = await getCounter();
    const textarea = await getTextarea();

    const initialStyle = await getBorderColor(textarea);
    expect(initialStyle).toBe(defaultColor);
    await textarea.hover();
    const hoverStyle = await getBorderColor(textarea);
    expect(hoverStyle).toBe(hoverColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(textarea)).toBe(defaultColor);

    await counter.hover();
    expect(await getBorderColor(textarea)).toBe(hoverColor);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTextarea({
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
      state: 'error',
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-textarea-wrapper'], 'componentDidLoad: p-textarea-wrapper').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initTextarea({
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
      state: 'error',
    });
    const host = await getHost();
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-textarea-wrapper'], 'componentDidUpdate: p-textarea-wrapper').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTextarea({ hasLabel: true });
    const textarea = await getTextarea();

    await expectA11yToMatchSnapshot(page, textarea);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper label="Some label" description="Some description">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>`
    );
    const textarea = await getTextarea();

    await expectA11yToMatchSnapshot(page, textarea);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>\``
    );
    const textarea = await getTextarea();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await initTextarea({ hasLabel: true });

    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const textarea = await getTextarea();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = none' });
  });
});
