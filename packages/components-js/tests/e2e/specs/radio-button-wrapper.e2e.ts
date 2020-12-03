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
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('radio-button-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getRadioButtonHost = () => selectNode(page, 'p-radio-button-wrapper');
  const getRadioButtonFakeInput = () =>
    selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
  const getRadioButtonRealInput = () => selectNode(page, 'p-radio-button-wrapper input');
  const getRadioButtonLabel = () => selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__label-text');
  const getRadioButtonMessage = () => selectNode(page, 'p-radio-button-wrapper >>> .p-radio-button-wrapper__message');
  const getRadioButtonLabelLink = () => selectNode(page, 'p-radio-button-wrapper [slot="label"] a');
  const getRadioButtonMessageLink = () => selectNode(page, 'p-radio-button-wrapper [slot="message"] a');

  const initRadioButton = (
    {
      useSlottedLabel,
      useSlottedMessage,
      state,
    }: { useSlottedLabel?: boolean; useSlottedMessage?: boolean; state?: FormState } = {
      useSlottedLabel: false,
      useSlottedMessage: false,
      state: 'none',
    }
  ): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
        <p-radio-button-wrapper state="${state}">
          ${
            useSlottedLabel
              ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
              : ''
          }
          <input type="radio" />
          ${
            useSlottedMessage
              ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
              : ''
          }
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
    const el = await getRadioButtonFakeInput();
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
    const input = await getRadioButtonRealInput();
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
    const input = await getRadioButtonRealInput();
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

    const radioComponent = await getRadioButtonHost();
    expect(await getRadioButtonLabel()).toBeNull();

    await radioComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getRadioButtonLabel()).not.toBeNull();
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

    const radioComponent = await getRadioButtonHost();
    const input = await selectNode(page, 'input');

    expect(await getRadioButtonMessage()).toBeNull();
    await radioComponent.evaluate((el) => el.setAttribute('state', 'error'));
    await radioComponent.evaluate((el) => el.setAttribute('message', 'Some error message'));
    await waitForStencilLifecycle(page);

    expect(await getRadioButtonMessage()).toBeDefined();
    expect(await getAttribute(await getRadioButtonMessage(), 'role')).toEqual('alert');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message');

    await radioComponent.evaluate((el) => el.setAttribute('state', 'success'));
    await radioComponent.evaluate((el) => el.setAttribute('message', 'Some success message'));
    await waitForStencilLifecycle(page);

    expect(await getRadioButtonMessage()).toBeDefined();
    expect(await getAttribute(await getRadioButtonMessage(), 'role')).toBeNull();
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message');

    await radioComponent.evaluate((el) => el.setAttribute('state', 'none'));
    await radioComponent.evaluate((el) => el.setAttribute('message', ''));
    await waitForStencilLifecycle(page);

    expect(await getRadioButtonMessage()).toBeNull();
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label');
  });

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

    const radioComponent1Label = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const input1 = await selectNode(page, '#radio-1 > input[type="radio"]');
    const input2 = await selectNode(page, '#radio-2 > input[type="radio"]');

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await input1.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await input2.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getCssClasses(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
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

    const radioComponent1Label = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const labelText1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__label-text');
    const labelText2 = await selectNode(page, '#radio-2 >>> .p-radio-button-wrapper__label-text');

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getActiveElementId(page)).toBe('');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await labelText1.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getActiveElementId(page)).toBe('radio-1-input');

    await labelText2.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getCssClasses(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
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

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getCssClasses(fakeRadio2)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await fakeRadio1Input.evaluate((el) => el.setAttribute('checked', 'true'));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await fakeRadio2Input.evaluate((el) => el.setAttribute('checked', 'true'));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getCssClasses(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should disable radio-button when radio-button is set disabled programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
    );

    const fakeRadio1 = await selectNode(page, '#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio1Input = await selectNode(page, '#radio-1 > input');

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--disabled');

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--disabled');

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--disabled');
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initRadioButton();

      const input = await getRadioButtonRealInput();
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

      const labelLink = await getRadioButtonLabelLink();
      const messageLink = await getRadioButtonMessageLink();
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

      const host = await getRadioButtonHost();
      const input = await getRadioButtonRealInput();

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

      const host = await getRadioButtonHost();
      const labelLink = await getRadioButtonLabelLink();
      const messageLink = await getRadioButtonMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'error', offset: '1px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'success', offset: '1px' }));
    });
  });
});
