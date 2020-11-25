import {
  getAttribute,
  getBrowser,
  getCssClasses,
  getProperty, getStyleOnFocus,
  initAddEventListener,
  selectNode, setAttribute,
  setContentWithDesignSystem, waitForInheritedCSSTransition, expectedStyleOnFocus,
  waitForStencilLifecycle, getOutlineStyle
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('select-wrapper', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectHost = () => selectNode(page, 'p-select-wrapper');
  const getSelectFakeInput = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const getSelectMessage = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__message');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getSelectLabelLink = () => selectNode(page, 'p-select-wrapper [slot="label"] a');
  const getSelectDescriptionLink = () => selectNode(page, 'p-select-wrapper [slot="description"] a');
  const getSelectMessageLink = () => selectNode(page, 'p-select-wrapper [slot="message"] a');

  const initSelect = ({ useSlottedLabel, useSlottedDescription, useSlottedMessage, state }: { useSlottedLabel?: boolean; useSlottedDescription?: boolean; useSlottedMessage?: boolean; state?: FormState; } = { useSlottedLabel: false, useSlottedDescription: false, useSlottedMessage: false, state: 'none' }): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
        <p-select-wrapper state="${state}" ${!useSlottedLabel && 'label="Some label"'} ${!useSlottedDescription && 'label="Some description"'} ${!useSlottedMessage && 'label="Some message"'}>
          ${useSlottedLabel && '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'}
          ${useSlottedDescription && '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'}
          <select>
            <option>Option A</option>
            <option>Option B</option>
            <option>Option C</option>
          </select>
          ${useSlottedMessage && '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'}
        </p-select-wrapper>`
    );
  };

  it('should render', async () => {
    await initSelect();
    const el = await getSelectFakeInput();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await initSelect();
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" description="Some description" message="Some message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const selectComponent = await getSelectHost();
    const getLabelText = await getSelectLabel();

    expect(getLabelText).toBeNull();

    await page.evaluate((el) => el.setAttribute('label', 'Some label'), selectComponent);
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await initSelect();

    const selectComponent = await getSelectHost();
    const select = await getSelectRealInput();

    expect(await getSelectMessage()).toBeNull();

    await page.evaluate((el) => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toEqual('alert');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some error message');

    await page.evaluate((el) => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some success message');

    await page.evaluate((el) => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', ''), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await initSelect();

    const labelText = await getSelectLabel();
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

  it('should disable fake select when select is set disabled programmatically', async () => {
    await initSelect();

    const fakeSelect = await getSelectFakeInput();
    const select = await getSelectRealInput();

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <select>', async () => {
      await initSelect();

      const textarea = await getSelectRealInput();
      const hidden = expectedStyleOnFocus({color: 'transparent', offset: '2px'});
      const visible = expectedStyleOnFocus({color: 'neutral', offset: '2px'});

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
      await initSelect({useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error'});

      const labelLink = await getSelectLabelLink();
      const descriptionLink = await getSelectDescriptionLink();
      const messageLink = await getSelectMessageLink();
      const hidden = expectedStyleOnFocus({color: 'transparent'});
      const visible = expectedStyleOnFocus({color: 'hover'});

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

      const host = await getSelectHost();
      const input = await getSelectRealInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'neutral', offset: '2px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'success', offset: '2px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'error', offset: '2px'}));

      await setAttribute(host, 'theme', 'dark');

      await setAttribute(host, 'state', 'none');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'neutral', theme: 'dark', offset: '2px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'success', theme: 'dark', offset: '2px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'error', theme: 'dark', offset: '2px'}));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initSelect({useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error'});

      const host = await getSelectHost();
      const labelLink = await getSelectLabelLink();
      const descriptionLink = await getSelectDescriptionLink();
      const messageLink = await getSelectMessageLink();

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
