import {
  expectedStyleOnFocus,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('select-wrapper native', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getMessage = () => selectNode(page, 'p-select-wrapper >>> .message');
  const getLabel = () => selectNode(page, 'p-select-wrapper >>> .label__text');
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
    const {
      useSlottedLabel = false,
      useSlottedDescription = false,
      useSlottedMessage = false,
      state = 'none',
    } = opts ?? {};

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

    const host = await getHost();
    await setProperty(host, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabel()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await initSelect();
    const host = await getHost();
    const select = await getSelect();

    expect(await getMessage())
      .withContext('initially')
      .toBeNull();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = error')
      .toBeDefined();
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = error')
      .toEqual('alert');
    expect(await getProperty(select, 'ariaLabel'))
      .withContext('when state = error')
      .toEqual('Some label. Some error message');

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = success')
      .toBeDefined();
    expect(await getAttribute(await getMessage(), 'role'))
      .withContext('when state = success')
      .toBeNull();
    expect(await getProperty(select, 'ariaLabel'))
      .withContext('when state = success')
      .toEqual('Some label. Some success message');

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    expect(await getMessage())
      .withContext('when state = none')
      .toBeNull();
    expect(await getProperty(select, 'ariaLabel'))
      .withContext('when state = none')
      .toEqual('Some label. Some description');
  });

  it('should focus select when label text is clicked', async () => {
    await initSelect();
    const select = await getSelect();
    const hasSelectFocus = () => hasFocus(page, select);

    const labelText = await getLabel();
    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();
    expect(await hasSelectFocus()).toBe(true);
  });

  describe('accessibility', () => {
    it('should add aria-label to select', async () => {
      await initSelect();
      const select = await getSelect();
      expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some message');
    });

    it('should add aria-label with description text to select', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper label="Some label" description="Some description" native="true">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelect();
      expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some description');
    });

    it('should add aria-label with message text to select', async () => {
      await initSelect({ state: 'error' });
      const select = await getSelect();
      expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some message');
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).withContext('componentDidLoad: p-select-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(2); // label and message
      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(1); // arrow down

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips when opened', async () => {
      await initSelect();
      const select = await getSelect();
      const [, secondOption] = await select.$$('option');

      expect(await getProperty(select, 'value')).toBe('a');

      // Ensure no update on native select render
      await select.click();
      await setProperty(secondOption, 'selected', true);
      await waitForStencilLifecycle(page);

      expect(await getProperty(select, 'value')).toBe('b');

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });
  });
});
