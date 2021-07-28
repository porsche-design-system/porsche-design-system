import {
  addEventListener,
  expectedStyleOnFocus,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
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
  const getTextarea = () => selectNode(page, 'p-textarea-wrapper textarea');
  const getMessage = () => selectNode(page, 'p-textarea-wrapper >>> .message');
  const getLabel = () => selectNode(page, 'p-textarea-wrapper >>> .root__text');
  const getLabelLink = () => selectNode(page, 'p-textarea-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-textarea-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-textarea-wrapper [slot="message"] a');

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedDescription?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
    hasLabel?: boolean;
  };

  const initTextarea = (opts?: InitOptions): Promise<void> => {
    const {
      useSlottedLabel = false,
      useSlottedDescription = false,
      useSlottedMessage = false,
      state = 'none',
      hasLabel = false,
    } = opts ?? {};

    const slottedLabel = useSlottedLabel
      ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedDescription = useSlottedDescription
      ? '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedMessage = useSlottedMessage
      ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const label = hasLabel ? ' label="Some label"' : '';

    return setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper state="${state}"${label}>
          ${slottedLabel}
          ${slottedDescription}
          <textarea></textarea>
          ${slottedMessage}
        </p-textarea-wrapper>`
    );
  };

  it('should add aria-label to support screen readers properly', async () => {
    await initTextarea({ hasLabel: true });
    const textarea = await getTextarea();
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
    const textarea = await getTextarea();
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
    const textarea = await getTextarea();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await initTextarea();
    const textareaComponent = await getHost();

    expect(await getLabel()).toBeNull();

    await textareaComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getLabel()).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await initTextarea({ hasLabel: true });
    const textareaComponent = await getHost();
    const textarea = await getTextarea();

    expect(await getMessage()).toBeNull('initially');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'error');
      el.setAttribute('message', 'Some error message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = error')
      .toBeDefined();
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = error')
      .toBe('alert');
    expect(await getProperty(textarea, 'ariaLabel'))
      .withContext('when state = error')
      .toBe('Some label. Some error message');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'success');
      el.setAttribute('message', 'Some success message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = success')
      .toBeNull();
    expect(await getProperty(textarea, 'ariaLabel'))
      .withContext('when state = success')
      .toBe('Some label. Some success message');

    await textareaComponent.evaluate((el) => {
      el.setAttribute('state', 'none');
      el.setAttribute('message', '');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeNull('when state = none');
    expect(await getProperty(textarea, 'ariaLabel'))
      .withContext('when state = none')
      .toBe('Some label');
  });

  it('should focus textarea when label text is clicked', async () => {
    await initTextarea({ hasLabel: true });
    const labelText = await getLabel();
    const textarea = await getTextarea();

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

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTextarea({
        useSlottedLabel: true,
        useSlottedMessage: true,
        useSlottedDescription: true,
        state: 'error',
      });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-textarea-wrapper']).withContext('componentDidLoad: p-textarea-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(3);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
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

      expect(status.componentDidUpdate['p-textarea-wrapper'])
        .withContext('componentDidUpdate: p-textarea-wrapper')
        .toBe(1);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(1);
    });
  });
});
