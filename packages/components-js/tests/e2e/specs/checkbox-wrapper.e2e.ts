import {
  getActiveElementTagName,
  getAttribute,
  getBrowser,
  getProperty,
  getStyleOnFocus,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
  getElementStyle,
  waitForInputTransition,
  removeAttribute,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('checkbox-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-checkbox-wrapper');
  const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
  const getLabelText = () => selectNode(page, 'p-checkbox-wrapper >>> .label__text');
  const getMessage = () => selectNode(page, 'p-checkbox-wrapper >>> .message');
  const getLabelLink = () => selectNode(page, 'p-checkbox-wrapper [slot="label"] a');
  const getMessageLink = () => selectNode(page, 'p-checkbox-wrapper [slot="message"] a');

  const setIndeterminate = async (element: ElementHandle, value: boolean) => {
    await element.evaluate((el: HTMLInputElement, value: boolean) => {
      el.indeterminate = value;
    }, value);
  };

  const setChecked = async (element: ElementHandle, value: boolean) => {
    await element.evaluate((element: HTMLInputElement, value: boolean) => {
      element.checked = value;
    }, value);
  };

  const getBackgroundImage = (input: ElementHandle) => getElementStyle(input, 'backgroundImage');
  const backgroundURL = 'url("data:image';

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
  };

  const initCheckbox = (opts?: InitOptions): Promise<void> => {
    const { useSlottedLabel = false, useSlottedMessage = false, state = 'none' } = opts ?? {};

    const slottedLabel = useSlottedLabel
      ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedMessage = useSlottedMessage
      ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';

    return setContentWithDesignSystem(
      page,
      `
        <p-checkbox-wrapper state="${state}"${!useSlottedLabel && ' label="Some Label"'}>
          ${slottedLabel}
          <input type="checkbox" />
          ${slottedMessage}
        </p-checkbox-wrapper>`
    );
  };

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `
    );
    const input = await getInput();
    expect(await getProperty(input, 'ariaLabel')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label" message="Some error message" state="error">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `
    );
    const input = await getInput();
    expect(await getProperty(input, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper>
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const host = await getHost();
    expect(await getLabelText()).toBeNull();

    await setAttribute(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const host = await getHost();
    const input = await getInput();
    expect(await getMessage()).toBeNull('initially');

    await setAttribute(host, 'state', 'error');
    await setAttribute(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role')).toEqual('alert', 'when state = error');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message', 'when state = error');

    await setAttribute(host, 'state', 'success');
    await setAttribute(host, 'message', 'Some success message');
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message', 'when state = success');

    await setAttribute(host, 'state', 'none');
    await setAttribute(host, 'message', '');
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeNull('when state = none');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label', 'when state = none');
  });

  it('should toggle checkbox when input is clicked', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

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

  it('should toggle checkbox when label text is clicked and not set input as active element', async () => {
    await initCheckbox();

    const label = await getLabelText();
    const input = await getInput();
    const isInputChecked = () => getProperty(input, 'checked');

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
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const input = await getInput();

    expect(await getBackgroundImage(input)).toBe('none');

    await setAttribute(input, 'checked', 'true');
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await removeAttribute(input, 'checked');
    expect(await getBackgroundImage(input)).toBe('none');
  });

  it('should check/uncheck checkbox when checkbox property is changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const input = await getInput();

    expect(await getBackgroundImage(input)).toBe('none');

    await input.evaluate((el: HTMLInputElement) => (el.checked = true));
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await input.evaluate((el: HTMLInputElement) => (el.checked = false));
    expect(await getBackgroundImage(input)).toBe('none');
  });

  it('should disable checkbox when disabled attribute is set programmatically', async () => {
    await initCheckbox();

    const input = await getInput();
    const label = await getLabelText();
    const getLabelStyle = () => getElementStyle(label, 'color');
    const getCursor = () => getElementStyle(input, 'cursor');

    expect(await getCursor()).toBe('pointer');
    expect(await getLabelStyle()).toBe('rgb(0, 0, 0)');

    await setAttribute(input, 'disabled', 'true');
    await waitForInputTransition(page);

    expect(await getCursor()).toBe('not-allowed');
    expect(await getLabelStyle()).toBe('rgb(150, 152, 154)');

    await removeAttribute(input, 'disabled');
    await waitForInputTransition(page);

    expect(await getCursor()).toBe('pointer');
    expect(await getLabelStyle()).toBe('rgb(0, 0, 0)');
  });

  it('should disable checkbox when disabled property is set programmatically', async () => {
    await initCheckbox();

    const input = await getInput();
    const label = await getLabelText();
    const getLabelStyle = () => getElementStyle(label, 'color');
    const getCursor = () => getElementStyle(input, 'cursor');

    expect(await getCursor()).toBe('pointer');
    expect(await getLabelStyle()).toBe('rgb(0, 0, 0)');

    await input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForInputTransition(page);

    expect(await getCursor()).toBe('not-allowed');
    expect(await getLabelStyle()).toBe('rgb(150, 152, 154)');

    await input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForInputTransition(page);

    expect(await getCursor()).toBe('pointer');
    expect(await getLabelStyle()).toBe('rgb(0, 0, 0)');
  });

  describe('indeterminate state', () => {
    it('should show indeterminate state when checkbox is set to indeterminate', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
      );

      const input = await getInput();

      expect(await getBackgroundImage(input)).toBe('none');

      await setIndeterminate(input, true);
      expect(await getBackgroundImage(input)).toContain(backgroundURL);

      await setIndeterminate(input, false);
      expect(await getBackgroundImage(input)).toBe('none');
    });

    it('should remove indeterminate state when checkbox value is changed by the user', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
      );

      const input = await getInput();

      await setIndeterminate(input, true);
      const indeterminateImage = await getBackgroundImage(input);
      expect(indeterminateImage).toContain(backgroundURL, 'first indeterminate set');

      // checked Image is set
      await input.click();
      const checkedImage = await getBackgroundImage(input);
      expect(checkedImage).toContain(backgroundURL, 'first click');
      expect(indeterminateImage).not.toBe(checkedImage);

      await setIndeterminate(input, true);
      expect(await getBackgroundImage(input)).toContain(backgroundURL, 'second indeterminate set');

      await input.click();
      expect(await getBackgroundImage(input)).toBe('none', 'second click');
    });

    it('should keep indeterminate state when checkbox value is changed programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
          <p-checkbox-wrapper label="Some label">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>`
      );

      const input = await getInput();

      await setIndeterminate(input, true);
      expect(await getBackgroundImage(input)).toContain(backgroundURL);

      await setChecked(input, true);
      expect(await getBackgroundImage(input)).toContain(backgroundURL);

      await setChecked(input, false);
      expect(await getBackgroundImage(input)).toContain(backgroundURL);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and not on click for slotted <input>', async () => {
      await initCheckbox();

      const input = await getInput();
      const hidden = expectedStyleOnFocus({ css: 'outline', color: 'transparent' });
      const visible = expectedStyleOnFocus({ css: 'outline', color: 'neutral' });

      expect(await getOutlineStyle(input)).toBe(hidden);

      await input.click();

      expect(await getOutlineStyle(input)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(input)).toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initCheckbox({ useSlottedLabel: true, useSlottedMessage: true, state: 'error' });

      const labelLink = await getLabelLink();
      const messageLink = await getMessageLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(labelLink)).toBe(hidden);
      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await labelLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(labelLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(labelLink)).toBe(visible);

      await messageLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(messageLink)).toBe(visible);
    });

    it('should show outline of slotted <input> when it is focused', async () => {
      await initCheckbox();
      const input = await getInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'neutral' }));
    });

    it('should show outline of slotted <input> when it is focused on success', async () => {
      await initCheckbox();

      const host = await getHost();
      const input = await getInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'neutral' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'success' }), 'on success');
    });

    it('should show outline of slotted <input> when it is focused on error', async () => {
      await initCheckbox();

      const host = await getHost();
      const input = await getInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'neutral' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'error' }), 'on error');
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initCheckbox({ useSlottedLabel: true, useSlottedMessage: true, state: 'error' });

      const host = await getHost();
      const labelLink = await getLabelLink();
      const messageLink = await getMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'error', offset: '1px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'success', offset: '1px' }));
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-checkbox-wrapper']).toBe(1, 'componentDidLoad: p-checkbox-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(2, 'componentDidLoad: p-text');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-checkbox-wrapper']).toBe(0, 'componentDidUpdate: p-checkbox-wrapper');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });
  });
});
