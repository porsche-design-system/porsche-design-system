import {
  addEventListener,
  getAttribute,
  getBrowser,
  getProperty,
  getStyleOnFocus,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('textarea-wrapper', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-textarea-wrapper');
  const getInput = () => selectNode(page, 'p-textarea-wrapper textarea');
  const getMessage = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__message');
  const getLabel = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__label-text');
  const getLabelLink = () => selectNode(page, 'p-textarea-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-textarea-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-textarea-wrapper [slot="message"] a');

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedDescription?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
  };

  const initTextarea = (opts?: InitOptions): Promise<void> => {
    const { useSlottedLabel = false, useSlottedDescription = false, useSlottedMessage = false, state = 'none' } =
      opts ?? {};

    const slottedLabel = useSlottedLabel
      ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedDescription = useSlottedDescription
      ? '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedMessage = useSlottedMessage
      ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';

    return setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper state="${state}">
          ${slottedLabel}
          ${slottedDescription}
          <textarea></textarea>
          ${slottedMessage}
        </p-textarea-wrapper>`
    );
  };

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );
    const el = await getLabel();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );
    const textarea = await getInput();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label" description="Some description">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );
    const textarea = await getInput();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );
    const textarea = await getInput();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper>
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`
    );

    const textareaComponent = await getHost();

    expect(await getLabel()).toBeNull();

    await textareaComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getLabel()).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`
    );

    const textareaComponent = await getHost();
    const textarea = await getInput();

    expect(await getMessage()).toBeNull('initially');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'error');
      el.setAttribute('message', 'Some error message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role')).toBe('alert', 'when state = error');
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some error message', 'when state = error');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'success');
      el.setAttribute('message', 'Some success message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some success message', 'when state = success');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'none');
      el.setAttribute('message', '');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeNull('when state = none');
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label', 'when state = none');
  });

  it('should focus textarea when label text is clicked', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );

    const labelText = await getLabel();
    const textarea = await getInput();

    let textareaFocusSpyCalls = 0;
    await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

    expect(textareaFocusSpyCalls).toBe(0);

    await labelText.click();
    await waitForStencilLifecycle(page);

    expect(textareaFocusSpyCalls).toBe(1);
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <textarea>', async () => {
      await initTextarea();

      const textarea = await getInput();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '4px' });
      const visible = expectedStyleOnFocus({ color: 'neutral', offset: '4px' });

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
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(labelLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(labelLink)).toBe(visible);

      await descriptionLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(descriptionLink)).toBe(visible);

      await messageLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(messageLink)).toBe(visible);
    });

    it('should show outline of slotted <textarea> when it is focused', async () => {
      await initTextarea();

      const host = await getHost();
      const textarea = await getInput();

      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({ color: 'neutral', offset: '4px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({ color: 'success', offset: '4px' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({ color: 'error', offset: '4px' }));

      await setAttribute(textarea, 'readonly', 'true');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({ color: 'transparent', offset: '4px' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initTextarea({
        useSlottedLabel: true,
        useSlottedDescription: true,
        useSlottedMessage: true,
        state: 'error',
      });

      const host = await getHost();
      const labelLink = await getLabelLink();
      const descriptionLink = await getDescriptionLink();
      const messageLink = await getMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus({ color: 'neutral', offset: '1px' }));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'error', offset: '1px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'success', offset: '1px' }));
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

      expect(status.componentDidLoad['p-textarea-wrapper']).toBe(1, 'componentDidLoad: p-textarea-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(3, 'componentDidLoad: p-text');

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on init', async () => {
      await initTextarea({
        useSlottedLabel: true,
        useSlottedMessage: true,
        useSlottedDescription: true,
        state: 'error',
      });
      const host = await getHost();
      await setAttribute(host, 'state', 'none');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-textarea-wrapper']).toBe(1, 'componentDidUpdate: p-textarea-wrapper');

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
