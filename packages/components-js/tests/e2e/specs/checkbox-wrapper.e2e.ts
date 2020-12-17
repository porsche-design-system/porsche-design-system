import {
  getActiveElementTagName,
  getAttribute,
  getBrowser,
  getCssClasses,
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
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('checkbox-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-checkbox-wrapper');
  const getFakeInput = () => selectNode(page, 'p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
  const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
  const getLabel = () => selectNode(page, 'p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
  const getMessage = () => selectNode(page, 'p-checkbox-wrapper >>> .p-checkbox-wrapper__message');
  const getIcon = () => selectNode(page, 'p-checkbox-wrapper >>> p-icon');
  const getLabelLink = () => selectNode(page, 'p-checkbox-wrapper [slot="label"] a');
  const getMessageLink = () => selectNode(page, 'p-checkbox-wrapper [slot="message"] a');

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
        <p-checkbox-wrapper state="${state}">
          ${slottedLabel}
          <input type="checkbox" />
          ${slottedMessage}
        </p-checkbox-wrapper>`
    );
  };

  const getIconName = async () => getProperty(await getIcon(), 'name');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `
    );
    const el = await getFakeInput();
    expect(el).toBeDefined();
  });

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
    expect(await getLabel()).toBeNull();

    await host.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);
    expect(await getLabel()).not.toBeNull();
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

    await host.evaluate((el) => {
      el.setAttribute('state', 'error');
      el.setAttribute('message', 'Some error message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role')).toEqual('alert', 'when state = error');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message', 'when state = error');

    await host.evaluate((el) => {
      el.setAttribute('state', 'success');
      el.setAttribute('message', 'Some success message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message', 'when state = success');

    await host.evaluate((el) => {
      el.setAttribute('state', 'none');
      el.setAttribute('message', '');
    });
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

    const fakeInput = await getFakeInput();
    const input = await getInput();

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should toggle checkbox when label text is clicked', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const fakeInput = await getFakeInput();
    const label = await getLabel();
    const input = await getInput();

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getProperty(input, 'checked')).toBe(false);
    expect(await getActiveElementTagName(page)).not.toBe('INPUT');

    await label.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getProperty(input, 'checked')).toBe(true);
    expect(await getActiveElementTagName(page)).toBe('INPUT');

    await label.click();
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getProperty(input, 'checked')).toBe(false);
    expect(await getActiveElementTagName(page)).toBe('INPUT');
  });

  it('should check/uncheck checkbox when checkbox is changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const fakeInput = await getFakeInput();
    const input = await getInput();

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.evaluate((el: HTMLInputElement) => (el.checked = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.evaluate((el: HTMLInputElement) => (el.checked = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should disable checkbox when checkbox is set disabled programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

    const fakeInput = await getFakeInput();
    const input = await getInput();

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');
  });

  describe('indeterminate state', () => {
    const setIndeterminate = async (value: boolean) => {
      await page.evaluate((indeterminate: boolean) => {
        const input: HTMLInputElement = document.querySelector('input[type="checkbox"]');
        input.indeterminate = indeterminate;
      }, value);

      await waitForStencilLifecycle(page);
    };

    const setChecked = async (value: boolean) => {
      const indeterminate = await page.evaluate((checked: boolean) => {
        const input: HTMLInputElement = document.querySelector('input[type="checkbox"]');
        input.checked = checked;
        return input.indeterminate;
      }, value);

      if (!indeterminate) {
        await waitForStencilLifecycle(page);
      }
    };

    // ToDo: Refactor computedStyle Helper
    const showsIcon = () =>
      page.evaluate(async () => {
        const icon = document.querySelector('p-checkbox-wrapper').shadowRoot.querySelector('.p-checkbox-wrapper__icon');
        const style = getComputedStyle(icon);
        await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000 + 10)); // transitionDuration is in sec, timeout needs ms
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      });

    it('should show indeterminate state when checkbox is set to indeterminate', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
      );

      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(false);

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setIndeterminate(false);
      expect(await showsIcon()).toBe(false);
      expect(await getIconName()).toBe('check');
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

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await waitForStencilLifecycle(page);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(true);

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await waitForStencilLifecycle(page);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(false);
    });

    it('should keep indeterminate state when checkbox value is changed programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
          <p-checkbox-wrapper label="Some label">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>`
      );

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setChecked(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setChecked(false);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initCheckbox();

      const input = await getInput();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'neutral' });

      expect(await getOutlineStyle(input)).toBe(hidden);

      await input.click();

      expect(await getOutlineStyle(input)).toBe(visible);

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

      const host = await getHost();
      const input = await getInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'neutral' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'success' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'error' }));
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
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-checkbox-wrapper']).toBe(1, 'componentDidUpdate: p-checkbox-wrapper');

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
