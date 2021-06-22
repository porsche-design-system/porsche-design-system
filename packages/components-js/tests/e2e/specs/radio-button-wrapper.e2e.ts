import {
  expectedStyleOnFocus,
  getActiveElementId,
  getActiveElementTagName,
  getAttribute,
  getBoxShadowStyle,
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

describe('radio-button-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-radio-button-wrapper');
  const getInput = () => selectNode(page, 'p-radio-button-wrapper input');
  const getLabelText = () => selectNode(page, 'p-radio-button-wrapper >>> .root__text');
  const getMessage = () => selectNode(page, 'p-radio-button-wrapper >>> .message');
  const getLabelLink = () => selectNode(page, 'p-radio-button-wrapper [slot="label"] a');
  const getMessageLink = () => selectNode(page, 'p-radio-button-wrapper [slot="message"] a');
  const getBackgroundStyle = (element: ElementHandle) => getElementStyle(element, 'background');

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
  };

  const initRadioButton = (opts?: InitOptions): Promise<void> => {
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
        <p-radio-button-wrapper state="${state}">
          ${slottedLabel}
          <input type="radio" />
          ${slottedMessage}
        </p-radio-button-wrapper>`
    );
  };

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `
    );
    const input = await getInput();
    expect(await getProperty(input, 'ariaLabel')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" message="Some error message" state="error">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `
    );
    const input = await getInput();
    expect(await getProperty(input, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const radioComponent = await getHost();
    expect(await getLabelText()).toBeNull();

    await setAttribute(radioComponent, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const radioComponent = await getHost();
    const input = await selectNode(page, 'input');

    expect(await getMessage())
      .withContext('initially')
      .toBeNull();
    await setAttribute(radioComponent, 'state', 'error');
    await setAttribute(radioComponent, 'message', 'Some error message');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = error')
      .toBeDefined();
    expect(await getAttribute(await getMessage(), 'role')).toEqual('alert');
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = error')
      .toEqual('Some label. Some error message');

    await setAttribute(radioComponent, 'state', 'success');
    await setAttribute(radioComponent, 'message', 'Some success message');
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = success')
      .toBeNull();
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = success')
      .toEqual('Some label. Some success message');

    await setAttribute(radioComponent, 'state', 'none');
    await setAttribute(radioComponent, 'message', '');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = none')
      .toBeNull();
    expect(await getProperty(input, 'ariaLabel'))
      .withContext('when state = none')
      .toEqual('Some label');
  });

  it('should disable radio-button when disabled attribute is set programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const input = await getInput();
    const initialStyle = await getBackgroundStyle(input);
    const label = await getLabelText();
    const defaultLabelColor = 'rgb(0, 0, 0)';
    const getLabelColor = () => getElementStyle(label, 'color');

    expect(await getLabelColor()).toBe(defaultLabelColor);

    await setAttribute(input, 'disabled', 'true');
    await waitForInputTransition(page);

    expect(await getLabelColor()).not.toBe(defaultLabelColor);
    expect(await getBackgroundStyle(input)).not.toEqual(initialStyle);

    await removeAttribute(input, 'disabled');
    await waitForInputTransition(page);

    expect(await getLabelColor()).toBe(defaultLabelColor);
    expect(await getBackgroundStyle(input)).toEqual(initialStyle);
  });

  it('should disable radio-button when disabled property is set programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const input = await getInput();
    const initialStyle = await getBackgroundStyle(input);
    const label = await getLabelText();
    const defaultLabelColor = 'rgb(0, 0, 0)';
    const getLabelColor = () => getElementStyle(label, 'color');

    expect(await getLabelColor()).toBe(defaultLabelColor);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForInputTransition(page);

    expect(await getLabelColor()).not.toBe(defaultLabelColor);
    expect(await getBackgroundStyle(input)).not.toEqual(initialStyle);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForInputTransition(page);

    expect(await getLabelColor()).toBe(defaultLabelColor);
    expect(await getBackgroundStyle(input)).toEqual(initialStyle);
  });

  describe('checked state', () => {
    it('should check radio-button when input is clicked', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
      );

      const input1 = await selectNode(page, '#radio-1 > input[type="radio"]');
      const input2 = await selectNode(page, '#radio-2 > input[type="radio"]');

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

    it('should check radio-button when label text is clicked', async () => {
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

      const input1 = await selectNode(page, '#radio-1 > input[type="radio"]');
      const input2 = await selectNode(page, '#radio-2 > input[type="radio"]');
      const labelText1 = await selectNode(page, '#radio-1 >>> .root__text');
      const labelText2 = await selectNode(page, '#radio-2 >>> .root__text');
      const initialStyleInput1 = await getBackgroundStyle(input1);
      const initialStyleInput2 = await getBackgroundStyle(input2);

      expect(initialStyleInput1).toEqual(initialStyleInput2);
      expect(await getActiveElementId(page)).toBe('');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await labelText1.click();
      await waitForInputTransition(page);

      expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
      expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await labelText2.click();
      await waitForInputTransition(page);

      expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
      expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
      expect(await getActiveElementTagName(page)).toBe('BODY');
    });

    it('should check radio-button when checked attribute is changed programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
      );

      const input1 = await selectNode(page, '#radio-1 > input');
      const input2 = await selectNode(page, '#radio-2 > input');
      const initialStyleInput1 = await getBackgroundStyle(input1);
      const initialStyleInput2 = await getBackgroundStyle(input2);

      expect(initialStyleInput1).toEqual(initialStyleInput2);

      await setAttribute(input1, 'checked', 'true');
      await waitForInputTransition(page);

      expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
      expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

      await setAttribute(input2, 'checked', 'true');
      await waitForInputTransition(page);

      expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
      expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
    });
  });

  it('should check radio-button when checked property is changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const input1 = await selectNode(page, '#radio-1 > input');
    const input2 = await selectNode(page, '#radio-2 > input');
    const initialStyleInput1 = await getBackgroundStyle(input1);
    const initialStyleInput2 = await getBackgroundStyle(input2);

    expect(initialStyleInput1).toEqual(initialStyleInput2);

    await input1.evaluate((el: HTMLInputElement) => (el.checked = true));
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
    expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

    await input2.evaluate((el: HTMLInputElement) => (el.checked = true));
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
    expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initRadioButton();

      const input = await getInput();
      const visible = expectedStyleOnFocus({ color: 'neutral', css: 'boxShadow', offset: '1px' });

      expect(await getBoxShadowStyle(input))
        .withContext('initial')
        .toBe('none');

      await input.click();

      expect(await getBoxShadowStyle(input))
        .withContext('after click')
        .toBe('none');

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getBoxShadowStyle(input))
        .withContext('after keyboard navigation')
        .toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initRadioButton({ useSlottedLabel: true, useSlottedMessage: true, state: 'error' });

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
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-radio-button-wrapper'])
        .withContext('componentDidLoad: p-radio-button-wrapper')
        .toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(2);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });
  });
});
