import {
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
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

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getMessage = () => selectNode(page, 'p-select-wrapper >>> .message');
  const getLabelText = () => selectNode(page, 'p-select-wrapper >>> .label__text');

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

    expect(await getLabelText()).toBeNull();

    const host = await getHost();
    await setProperty(host, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await initSelect();
    const host = await getHost();

    expect(await getMessage(), 'initially').toBeNull();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);

    expect(await getMessage(), 'when state = error').toBeDefined();

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message');
    await waitForStencilLifecycle(page);

    expect(await getMessage(), 'when state = success').toBeDefined();

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    expect(await getMessage(), 'when state = none').toBeNull();
  });

  it('should focus select when label text is clicked', async () => {
    await initSelect();
    const select = await getSelect();
    const hasSelectFocus = () => hasFocus(page, select);

    const labelText = await getLabelText();
    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();
    expect(await hasSelectFocus()).toBe(true);
  });

  it('should change border-color of select when label text is hovered', async () => {
    await initSelect();

    await page.mouse.move(0, 100); // mouse seems to be in top left corner initially causing hover state
    const select = await getSelect();
    const labelText = await getLabelText();
    const initialBorderColor = await getElementStyle(select, 'borderColor');

    await labelText.hover();
    expect(await getElementStyle(select, 'borderColor')).not.toBe(initialBorderColor);
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2); // label and message
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
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

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initSelect();
      const select = await getSelect();

      await expectA11yToMatchSnapshot(page, select);
    });

    it('should update accessibility tree with message text if state changes programmatically', async () => {
      await initSelect();
      const host = await getHost();

      await setProperty(host, 'state', 'error');
      await setProperty(host, 'message', 'Some error message.');
      await waitForStencilLifecycle(page);

      const select = await getSelect();
      const message = await getMessage();

      await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = error' });
      await expectA11yToMatchSnapshot(page, message, {
        message: 'Of Message when state = error',
        interestingOnly: false,
      });

      await setProperty(host, 'state', 'success');
      await setProperty(host, 'message', 'Some success message.');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = success' });
      await expectA11yToMatchSnapshot(page, message, {
        message: 'Of Message when state = success',
        interestingOnly: false,
      });

      await setProperty(host, 'state', 'none');
      await setProperty(host, 'message', '');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = none' });
    });
  });
});
