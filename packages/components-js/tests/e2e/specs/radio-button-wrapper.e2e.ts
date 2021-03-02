import {
  getActiveElementId,
  getActiveElementTagName,
  getAttribute,
  getStyleOnFocus,
  getBrowser,
  getCssClasses,
  getProperty,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  waitForInheritedCSSTransition,
  getOutlineStyle,
  getBoxShadowStyle,
  getLifecycleStatus,
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('radio-button-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-radio-button-wrapper');
  const getFakeInput = () => selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
  const getInput = () => selectNode(page, 'p-radio-button-wrapper input');
  const getLabel = () => selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__label-text');
  const getMessage = () => selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__message');
  const getLabelLink = () => selectNode(page, 'p-radio-button-wrapper [slot="label"] a');
  const getMessageLink = () => selectNode(page, 'p-radio-button-wrapper [slot="message"] a');

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

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `
    );
    const el = await getFakeInput();
    expect(el).toBeDefined();
  });

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
    expect(await getLabel()).toBeNull();

    await radioComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getLabel()).not.toBeNull();
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

    expect(await getMessage()).toBeNull('initially');
    await radioComponent.evaluate((el) => {
      el.setAttribute('state', 'error');
      el.setAttribute('message', 'Some error message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role')).toEqual('alert');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message', 'when state = error');

    await radioComponent.evaluate((el) => {
      el.setAttribute('state', 'success');
      el.setAttribute('message', 'Some success message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message', 'when state = success');

    await radioComponent.evaluate((el) => {
      el.setAttribute('state', 'none');
      el.setAttribute('message', '');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeNull('when state = none');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label', 'when state = none');
  });

  it('should disable radio-button when radio-button is set disabled programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const fakeDisabledClass = 'p-radio-button-wrapper__fake-radio-button--disabled';
    const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio1Input = await selectNode(page, '#radio-1 > input');

    expect(await getCssClasses(fakeRadio1)).not.toContain(fakeDisabledClass);

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).toContain(fakeDisabledClass);

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).not.toContain(fakeDisabledClass);
  });

  describe('checked state', () => {
    const fakeCheckedClass = 'p-radio-button-wrapper__fake-radio-button--checked';

    it('should check radio-button when input is clicked', async () => {
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

      const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
      const fakeRadio2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
      const input1 = await selectNode(page, '#radio-1 > input[type="radio"]');
      const input2 = await selectNode(page, '#radio-2 > input[type="radio"]');

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);

      await input1.click();
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).toContain(fakeCheckedClass);

      await input2.click();
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);
      expect(await getCssClasses(fakeRadio2)).toContain(fakeCheckedClass);
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

      const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
      const fakeRadio2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
      const labelText1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__label-text');
      const labelText2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__label-text');

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);
      expect(await getActiveElementId(page)).toBe('');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await labelText1.click();
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).toContain(fakeCheckedClass);
      expect(await getActiveElementId(page)).toBe('radio-1-input');

      await labelText2.click();
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);
      expect(await getCssClasses(fakeRadio2)).toContain(fakeCheckedClass);
      expect(await getActiveElementId(page)).toBe('radio-2-input');
    });

    it('should check radio-button when radio-button is changed programmatically', async () => {
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

      const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
      const fakeRadio1Input = await selectNode(page, '#radio-1 > input');
      const fakeRadio2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
      const fakeRadio2Input = await selectNode(page, '#radio-2 > input');

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);
      expect(await getCssClasses(fakeRadio2)).not.toContain(fakeCheckedClass);

      await fakeRadio1Input.evaluate((el) => el.setAttribute('checked', 'true'));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).toContain(fakeCheckedClass);

      await fakeRadio2Input.evaluate((el) => el.setAttribute('checked', 'true'));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeRadio1)).not.toContain(fakeCheckedClass);
      expect(await getCssClasses(fakeRadio2)).toContain(fakeCheckedClass);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initRadioButton();

      const input = await getInput();
      const hidden = expectedStyleOnFocus({ color: 'transparent', css: 'boxShadow', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'neutral', css: 'boxShadow', offset: '1px' });

      expect(await getBoxShadowStyle(input)).toBe(hidden);

      await input.click();

      expect(await getBoxShadowStyle(input)).toBe(visible);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getBoxShadowStyle(input)).toBe(visible);
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
      await initRadioButton();

      const host = await getHost();
      const input = await getInput();

      expect(await getStyleOnFocus(input, 'boxShadow')).toBe(
        expectedStyleOnFocus({ color: 'neutral', css: 'boxShadow' })
      );

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input, 'boxShadow')).toBe(
        expectedStyleOnFocus({ color: 'success', css: 'boxShadow' })
      );

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input, 'boxShadow')).toBe(
        expectedStyleOnFocus({ color: 'error', css: 'boxShadow' })
      );
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initRadioButton({ useSlottedLabel: true, useSlottedMessage: true, state: 'error' });

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
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-radio-button-wrapper']).toBe(1, 'componentDidLoad: p-radio-button-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(2, 'componentDidLoad: p-text');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-radio-button-wrapper']).toBe(1, 'componentDidUpdate: p-radio-button-wrapper');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
