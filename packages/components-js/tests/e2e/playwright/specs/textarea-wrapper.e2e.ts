import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getElementInnerText,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  setAttribute,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.$('p-textarea-wrapper');
const getTextarea = (page: Page) => page.$('p-textarea-wrapper textarea');
const getLabel = (page: Page) => page.$('p-textarea-wrapper label');
const getCounter = (page: Page) => page.$('p-textarea-wrapper .counter');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  hasLabel?: boolean;
  maxLength?: number;
};

const initTextarea = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
    hasLabel = false,
    maxLength,
  } = opts || {};

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

test('should focus textarea when label is clicked', async ({ page }) => {
  await initTextarea(page, { hasLabel: true });
  const label = await getLabel(page);
  const textarea = await getTextarea(page);

  await addEventListener(textarea, 'focus');
  expect((await getEventSummary(textarea, 'focus')).counter).toBe(0);

  await label.click();
  await waitForStencilLifecycle(page);
  expect((await getEventSummary(textarea, 'focus')).counter).toBe(1);
});

test('should focus textarea when counter text is clicked', async ({ page }) => {
  await initTextarea(page, { maxLength: 160 });
  const counter = await getCounter(page);
  const textarea = await getTextarea(page);

  await addEventListener(textarea, 'focus');
  expect((await getEventSummary(textarea, 'focus')).counter).toBe(0);

  await counter.click();
  await waitForStencilLifecycle(page);
  expect((await getEventSummary(textarea, 'focus')).counter).toBe(1);
});

test('should display correct counter when typing', async ({ page }) => {
  await initTextarea(page, { maxLength: 160 });
  const counter = await getCounter(page);
  const textarea = await getTextarea(page);

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

test('should render characterCountElement when maxlength is set', async ({ page }) => {
  await initTextarea(page);
  const textarea = await getTextarea(page);

  expect(await page.$('p-textarea-wrapper label .sr-only')).toBeNull();

  await setAttribute(textarea, 'maxlength', '20');

  expect(await page.$('p-textarea-wrapper label .sr-only')).toBeDefined();
});

// TODO: Activate test
// puppeteer ignores @media(hover: hover) styles, but playwright can handle it
test.describe('hover state', () => {
  test.skip();
  const getBorderColor = (element: ElementHandle<HTMLElement>) => getElementStyle(element, 'borderColor');
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input when label is hovered', async ({ page }) => {
    await initTextarea(page, { hasLabel: true });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = await getLabel(page);
    const textarea = await getTextarea(page);

    const initialStyle = await getBorderColor(textarea);
    expect(initialStyle).toBe(defaultBorderColor);
    await textarea.hover();
    const hoverStyle = await getBorderColor(textarea);
    expect(hoverStyle).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(textarea)).toBe(defaultBorderColor);

    await label.hover();
    expect(await getBorderColor(textarea)).toBe(hoverBorderColor);
  });

  test('should show hover state on textarea when counter is hovered', async ({ page }) => {
    await initTextarea(page, { maxLength: 160 });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = await getCounter(page);
    const textarea = await getTextarea(page);

    const initialStyle = await getBorderColor(textarea);
    expect(initialStyle).toBe(defaultBorderColor);
    await textarea.hover();
    const hoverStyle = await getBorderColor(textarea);
    expect(hoverStyle).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(textarea)).toBe(defaultBorderColor);

    await counter.hover();
    expect(await getBorderColor(textarea)).toBe(hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTextarea(page, {
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

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initTextarea(page, {
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
      state: 'error',
    });
    const host = await getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-textarea-wrapper'], 'componentDidUpdate: p-textarea-wrapper').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
