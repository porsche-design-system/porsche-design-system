import {
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('checkbox-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-checkbox-wrapper');
  const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
  const getLabelText = () => selectNode(page, 'p-checkbox-wrapper >>> .root__text');
  const getMessage = () => selectNode(page, 'p-checkbox-wrapper >>> .message');
  const getLabelLink = () => selectNode(page, 'p-checkbox-wrapper [slot="label"] a');
  const getMessageLink = () => selectNode(page, 'p-checkbox-wrapper [slot="message"] a');

  const setIndeterminate = async (element: ElementHandle, value: boolean) => {
    await setProperty(element, 'indeterminate', value);
  };

  const setChecked = async (element: ElementHandle, value: boolean) => {
    await setProperty(element, 'checked', value);
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

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text with message if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
    );

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

    await setProperty(input, 'checked', true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setProperty(input, 'checked', false);
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

    await setProperty(input, 'checked', true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setProperty(input, 'checked', false);
    expect(await getBackgroundImage(input)).toBe('none');
  });

  it('should disable checkbox when disabled property is set programmatically', async () => {
    await initCheckbox();

    const input = await getInput();
    const label = await getLabelText();
    const getLabelStyle = () => getElementStyle(label, 'color');
    const getCursor = () => getElementStyle(input, 'cursor');

    expect(await getCursor()).toBe('pointer');
    expect(await getLabelStyle()).toBe('rgb(0, 0, 0)');

    await setProperty(input, 'disabled', true);
    await waitForInputTransition(page);

    expect(await getCursor()).toBe('not-allowed');
    expect(await getLabelStyle()).toBe('rgb(150, 152, 154)');

    await setProperty(input, 'disabled', false);
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
      expect(indeterminateImage, 'first indeterminate set').toContain(backgroundURL);

      // checked Image is set
      await input.click();
      const checkedImage = await getBackgroundImage(input);
      expect(checkedImage, 'first click').toContain(backgroundURL);
      expect(indeterminateImage).not.toBe(checkedImage);

      await setIndeterminate(input, true);
      expect(await getBackgroundImage(input), 'second indeterminate set').toContain(backgroundURL);

      await input.click();
      expect(await getBackgroundImage(input), 'second click').toBe('none');
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

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initCheckbox({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-checkbox-wrapper'], 'componentDidUpdate: p-checkbox-wrapper').toBe(0);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initCheckbox();
      const input = await getInput();

      await expectA11yToMatchSnapshot(page, input);
    });

    it('should expose correct accessibility tree properties in error state', async () => {
      await setContentWithDesignSystem(
        page,
        `
          <p-checkbox-wrapper label="Some label" message="Some error message." state="error">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>
        `
      );
      const input = await getInput();
      const message = await getMessage();

      await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
      await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
    });

    it('should add/remove accessibility tree properties if state changes programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`
      );

      const host = await getHost();

      await setProperty(host, 'state', 'error');
      await setProperty(host, 'message', 'Some error message.');
      await waitForStencilLifecycle(page);

      const input = await getInput();
      const message = await getMessage();

      await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = error' });
      await expectA11yToMatchSnapshot(page, message, {
        message: 'Of Message when state = error',
        interestingOnly: false,
      });

      await setProperty(host, 'state', 'success');
      await setProperty(host, 'message', 'Some success message.');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = success' });
      await expectA11yToMatchSnapshot(page, message, {
        message: 'Of Message when state = success',
        interestingOnly: false,
      });

      await setProperty(host, 'state', 'none');
      await setProperty(host, 'message', '');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = none' });
    });
  });
});
