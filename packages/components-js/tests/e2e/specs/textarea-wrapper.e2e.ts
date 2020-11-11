import {
  addEventListener,
  getAttribute,
  getBrowser,
  getProperty, getStyleOnFocus,
  initAddEventListener,
  selectNode, setAttribute,
  setContentWithDesignSystem, waitForInheritedCSSTransition, expectedStyleOnFocus,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

describe('textarea-wrapper', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getTextareaHost = () => selectNode(page, 'p-textarea-wrapper');
  const getTextareaFakeInput = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__fake-textarea');
  const getTextareaRealInput = () => selectNode(page, 'p-textarea-wrapper textarea');
  const getTextareaMessage = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__message');
  const getTextareaLabel = () => selectNode(page, 'p-textarea-wrapper >>> .p-textarea-wrapper__label-text');
  const getTextareaLabelLink = () => selectNode(page, 'p-textarea-wrapper [slot="label"] a');
  const getTextareaDescriptionLink = () => selectNode(page, 'p-textarea-wrapper [slot="description"] a');
  const getTextareaMessageLink = () => selectNode(page, 'p-textarea-wrapper [slot="message"] a');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );
    const el = await getTextareaLabel();
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
    const textarea = await getTextareaRealInput();
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
    const textarea = await getTextareaRealInput();
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
    const textarea = await getTextareaRealInput();
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

    const textareaComponent = await getTextareaHost();

    expect(await getTextareaLabel()).toBeNull();

    await textareaComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getTextareaLabel()).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>`
    );

    const textareaComponent = await getTextareaHost();
    const textarea = await getTextareaRealInput();

    expect(await getTextareaMessage()).toBeNull();

    await textareaComponent.evaluate((el) => el.setAttribute('state', 'error'));
    await textareaComponent.evaluate((el) => el.setAttribute('message', 'Some error message'));
    await waitForStencilLifecycle(page);

    expect(await getTextareaMessage()).toBeDefined();
    expect(await getAttribute(await getTextareaMessage(), 'role')).toBe('alert');
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some error message');

    await textareaComponent.evaluate((el) => el.setAttribute('state', 'success'));
    await textareaComponent.evaluate((el) => el.setAttribute('message', 'Some success message'));
    await waitForStencilLifecycle(page);

    expect(await getTextareaMessage()).toBeDefined();
    expect(await getAttribute(await getTextareaMessage(), 'role')).toBeNull();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label. Some success message');

    await textareaComponent.evaluate((el) => el.setAttribute('state', ''));
    await textareaComponent.evaluate((el) => el.setAttribute('message', ''));
    await waitForStencilLifecycle(page);

    expect(await getTextareaMessage()).toBeNull();
    expect(await getProperty(textarea, 'ariaLabel')).toBe('Some label');
  });

  it(`should focus textarea when label text is clicked`, async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-textarea-wrapper label="Some label">
        <textarea name="some-name"></textarea>
      </p-textarea-wrapper>
    `
    );

    const labelText = await getTextareaLabel();
    const textarea = await getTextareaRealInput();

    let textareaFocusSpyCalls = 0;
    await addEventListener(textarea, 'focus', () => textareaFocusSpyCalls++);

    expect(textareaFocusSpyCalls).toBe(0);

    await labelText.click();
    await waitForStencilLifecycle(page);

    expect(textareaFocusSpyCalls).toBe(1);
  });

  describe('focus state', () => {
    it('should show outline of slotted <textarea> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-textarea-wrapper>
          <textarea></textarea>
        </p-textarea-wrapper>`
      );

      const host = await getTextareaHost();
      const textarea = await getTextareaRealInput();

      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({color: 'neutral', offset: '4px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({color: 'success', offset: '4px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({color: 'error', offset: '4px'}));

      await setAttribute(textarea, 'readOnly', 'true');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(textarea)).toBe(expectedStyleOnFocus({color: 'transparent', offset: '4px'}));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-textarea-wrapper state="error">
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <span slot="description">Some description with a <a href="#">link</a>.</span>
          <textarea></textarea>
          <span slot="message">Some error message with a <a href="#">link</a>.</span>
        </p-textarea-wrapper>`
      );

      const host = await getTextareaHost();
      const labelLink = await getTextareaLabelLink();
      const descriptionLink = await getTextareaDescriptionLink();
      const messageLink = await getTextareaMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus());
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus({color: 'neutral'}));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({color: 'error'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({color: 'success'}));
    });
  });
});
