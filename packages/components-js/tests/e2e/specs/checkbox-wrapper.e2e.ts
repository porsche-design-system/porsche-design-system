import {
  expectedStyleOnFocus,
  getActiveElementTagName,
  getAttribute,
  getBrowser,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  removeAttribute,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('checkbox-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-checkbox-wrapper');
  const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
  const getLabelText = () => selectNode(page, 'p-checkbox-wrapper >>> .root__text');
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
    expect(await getMessage())
      .withContext('initially')
      .toBeNull();

    await setAttribute(host, 'state', 'error');
    await setAttribute(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = error')
      .toEqual('alert');
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = error')
      .toEqual('Some label. Some error message');

    await setAttribute(host, 'state', 'success');
    await setAttribute(host, 'message', 'Some success message');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = success')
      .toBeDefined();
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = success')
      .toBeNull();
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = success')
      .toEqual('Some label. Some success message');

    await setAttribute(host, 'state', 'none');
    await setAttribute(host, 'message', '');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = none')
      .toBeNull();
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = none')
      .toEqual('Some label');
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
      expect(indeterminateImage).withContext('first indeterminate set').toContain(backgroundURL);

      // checked Image is set
      await input.click();
      const checkedImage = await getBackgroundImage(input);
      expect(checkedImage).withContext('first click').toContain(backgroundURL);
      expect(indeterminateImage).not.toBe(checkedImage);

      await setIndeterminate(input, true);
      expect(await getBackgroundImage(input))
        .withContext('second indeterminate set')
        .toContain(backgroundURL);

      await input.click();
      expect(await getBackgroundImage(input))
        .withContext('second click')
        .toBe('none');
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

      expect(await getOutlineStyle(labelLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(labelLink)).toBe(visible);

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
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-checkbox-wrapper']).withContext('componentDidLoad: p-checkbox-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(2);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-checkbox-wrapper'])
        .withContext('componentDidUpdate: p-checkbox-wrapper')
        .toBe(0);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });
  });
});
