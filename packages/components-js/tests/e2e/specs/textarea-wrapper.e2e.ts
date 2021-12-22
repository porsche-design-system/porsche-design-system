import {
  addEventListener,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  getOutlineStyle,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
  getElementInnerText,
  getElementStyle,
  waitForEventSerialization,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('textarea-wrapper', () => {
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
  const getLabelLink = () => selectNode(page, 'p-textarea-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-textarea-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-textarea-wrapper [slot="message"] a');

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
    const slottedDescription = useSlottedDescription
      ? `<span slot="description">Description with a ${link}</span>`
      : '';
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

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <textarea>', async () => {
      await initTextarea();

      const textarea = await getTextarea();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '2px' });
      const visible = expectedStyleOnFocus({ color: 'neutral', offset: '2px' });

      expect(await getOutlineStyle(textarea)).toBe(hidden);

      await textarea.click();

      expect(await getOutlineStyle(textarea)).toBe(visible);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(textarea)).toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initTextarea({
        useSlottedLabel: true,
        useSlottedDescription: true,
        useSlottedMessage: true,
        state: 'error',
      });

      const labelLink = await getLabelLink();
      const descriptionLink = await getDescriptionLink();
      const messageLink = await getMessageLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(labelLink)).toBe(hidden);
      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);
      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await labelLink.click();

      expect(await getOutlineStyle(labelLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(labelLink)).toBe(visible);

      await descriptionLink.click();

      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(descriptionLink)).toBe(visible);

      await messageLink.click();

      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(messageLink)).toBe(visible);
    });
  });

  describe('hover state', () => {
    const getBorderColor = (element: ElementHandle) => getElementStyle(element, 'borderColor');

    it('should show hover state on input when label is hovered', async () => {
      await initTextarea({ hasLabel: true });
      const label = await getLabel();
      const textarea = await getTextarea();

      const initialStyle = await getBorderColor(textarea);
      await textarea.hover();
      const hoverStyle = await getBorderColor(textarea);
      console.log('initialStyle', initialStyle, 'hoverStyle', hoverStyle);
      expect(initialStyle).not.toBe(hoverStyle);

      await page.mouse.move(0, 300); // undo hover
      expect(await getBorderColor(textarea)).toBe(initialStyle);

      await label.hover();
      expect(await getBorderColor(textarea)).toBe(hoverStyle);
    });

    it('should show hover state on textarea when counter is hovered', async () => {
      await initTextarea({ maxLength: 160 });
      const counter = await getCounter();
      const textarea = await getTextarea();

      const initialStyle = await getBorderColor(textarea);
      await textarea.hover();
      const hoverStyle = await getBorderColor(textarea);
      expect(initialStyle).not.toBe(hoverStyle);

      await page.mouse.move(0, 300); // undo hover
      expect(await getBorderColor(textarea)).toBe(initialStyle);

      await counter.hover();
      expect(await getBorderColor(textarea)).toBe(hoverStyle);
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
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(3);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
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

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
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
});
