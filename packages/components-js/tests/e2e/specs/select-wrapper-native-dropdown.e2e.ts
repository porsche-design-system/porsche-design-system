import {
  expectedStyleOnFocus,
  getAttribute,
  getBrowser,
  getCssClasses,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  getStyleOnFocus,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('select-wrapper native-dropdown', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getFakeSelect = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getMessage = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__message');
  const getLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getLabelLink = () => selectNode(page, 'p-select-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-select-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-select-wrapper [slot="message"] a');

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedDescription?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
  };

  const initSelect = (opts?: InitOptions): Promise<void> => {
    const { useSlottedLabel = false, useSlottedDescription = false, useSlottedMessage = false, state = 'none' } =
      opts ?? {};

    const label = !useSlottedLabel ? 'label="Some label"' : '';
    const description = !useSlottedDescription ? 'description="Some description"' : '';
    const message = !useSlottedMessage ? 'message="Some message"' : '';
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
        <p-select-wrapper state="${state}" native="true" ${label} ${description} ${message}>
          ${slottedLabel}
          ${slottedDescription}
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
          ${slottedMessage}
        </p-select-wrapper>`
    );
  };

  it('should render', async () => {
    await initSelect();
    const el = await getFakeSelect();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await initSelect();
    const select = await getSelect();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some message');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" description="Some description" native="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelect();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await initSelect({ state: 'error' });
    const select = await getSelect();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper>
        <select name="some-name" native="true">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    expect(await getLabel()).toBeNull();

    const selectComponent = await getHost();
    await setAttribute(selectComponent, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabel()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await initSelect();

    const selectComponent = await getHost();
    const select = await getSelect();

    expect(await getMessage()).toBeNull('initially');

    await selectComponent.evaluate((el) => {
      el.setAttribute('state', 'error');
      el.setAttribute('message', 'Some error message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = error');
    expect(await getAttribute(await getMessage(), 'role')).toEqual('alert', 'when state = error');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some error message', 'when state = error');

    await selectComponent.evaluate((el) => {
      el.setAttribute('state', 'success');
      el.setAttribute('message', 'Some success message');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeDefined('when state = success');
    expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some success message', 'when state = success');

    await selectComponent.evaluate((el) => {
      el.setAttribute('state', 'none');
      el.setAttribute('message', '');
    });
    await waitForStencilLifecycle(page);

    expect(await getMessage()).toBeNull('when state = none');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some description', 'when state = none');
  });

  it('should focus select when label text is clicked', async () => {
    await initSelect();

    const labelText = await getLabel();
    expect(labelText).toBeDefined();

    async function hasSelectFocus() {
      return await page.evaluate(() => {
        const selectElement = document.querySelector('select');
        return document.activeElement === selectElement;
      });
    }

    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();

    expect(await hasSelectFocus()).toBe(true);
  });

  it('should disable fake select when select is disabled programmatically', async () => {
    await initSelect();

    const fakeSelect = await getFakeSelect();
    const select = await getSelect();
    const disabledClass = 'p-select-wrapper__fake-select--disabled';

    expect(await getCssClasses(fakeSelect)).not.toContain(disabledClass, 'initially');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).toContain(disabledClass, 'when disabled = true');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).not.toContain(disabledClass, 'when disabled = false');
  });

  describe('focus state', () => {
    it('should be shown on click for slotted <select>', async () => {
      await initSelect();

      const select = await getSelect();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'neutral' });

      expect(await getOutlineStyle(select)).toBe(hidden);

      await select.click();

      expect(await getOutlineStyle(select)).toBe(visible, 'after click');
    });

    it('should be shown by keyboard navigation for slotted <select>', async () => {
      await initSelect();

      const select = await getSelect();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'neutral' });

      expect(await getOutlineStyle(select)).toBe(hidden);

      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(select)).toBe(visible, 'after keyboard navigation');
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initSelect({ useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error' });

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

    it('should show outline of slotted <select> when it is focused', async () => {
      await initSelect();

      const host = await getHost();
      const select = await getSelect();

      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'neutral' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'success' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'error' }));

      await setAttribute(host, 'theme', 'dark');

      await setAttribute(host, 'state', 'none');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'neutral', theme: 'dark' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'success', theme: 'dark' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(select)).toBe(expectedStyleOnFocus({ color: 'error', theme: 'dark' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initSelect({ useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error' });

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
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).toBe(1, 'componentDidLoad: p-select-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(2, 'componentDidLoad: p-text'); // label and message
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon'); // arrow down

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on dropdown open', async () => {
      await initSelect();
      const select = await getSelect();
      const [, secondOption] = await select.$$('option');

      expect(await getProperty(select, 'value')).toBe('a');

      // Ensure no update on native select render
      await select.click();
      await secondOption.evaluate((el: HTMLOptionElement) => (el.selected = true));

      expect(await getProperty(select, 'value')).toBe('b');

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all).toBe(4, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });
  });
});
