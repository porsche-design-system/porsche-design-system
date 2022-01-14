import {
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getElementStyle,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('radio-button-wrapper', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-radio-button-wrapper');
  const getInput = () => selectNode(page, 'p-radio-button-wrapper input');
  const getLabelText = () => selectNode(page, 'p-radio-button-wrapper >>> .label');
  const getMessage = () => selectNode(page, 'p-radio-button-wrapper >>> .message');
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
        <p-radio-button-wrapper state="${state}" ${useSlottedLabel ? '' : 'label="Some label"'}>
          ${slottedLabel}
          <input type="radio" />
          ${slottedMessage}
        </p-radio-button-wrapper>`
    );
  };

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

    await setProperty(radioComponent, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`
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

    await setProperty(input, 'disabled', true);
    await waitForInputTransition(page);

    expect(await getLabelColor()).not.toBe(defaultLabelColor);
    expect(await getBackgroundStyle(input)).not.toEqual(initialStyle);

    await setProperty(input, 'disabled', false);
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
      const labelText1 = await selectNode(page, '#radio-1 >>> .label');
      const labelText2 = await selectNode(page, '#radio-2 >>> .label');
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

      await setProperty(input1, 'checked', true);
      await waitForInputTransition(page);

      expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
      expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

      await setProperty(input2, 'checked', true);
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

    await setProperty(input1, 'checked', true);
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).not.toEqual(initialStyleInput1);
    expect(initialStyleInput2).toEqual(await getBackgroundStyle(input2));

    await setProperty(input2, 'checked', true);
    await waitForInputTransition(page);

    expect(await getBackgroundStyle(input1)).toEqual(initialStyleInput1);
    expect(await getBackgroundStyle(input2)).not.toEqual(initialStyleInput2);
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-radio-button-wrapper'], 'componentDidLoad: p-radio-button-wrapper').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initRadioButton({ useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
      const input = await getInput();

      await input.click();
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initRadioButton();
      const input = await getInput();

      await expectA11yToMatchSnapshot(page, input);
    });

    it('should expose correct accessibility tree properties in error state', async () => {
      await setContentWithDesignSystem(
        page,
        `
          <p-radio-button-wrapper label="Some label" message="Some error message." state="error">
            <input type="radio" name="some-name"/>
          </p-radio-button-wrapper>
        `
      );
      const input = await getInput();
      const message = await getMessage();

      await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
      await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
    });

    it('should add/remove accessibility tree properties if state changes programmatically', async () => {
      await initRadioButton();

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
