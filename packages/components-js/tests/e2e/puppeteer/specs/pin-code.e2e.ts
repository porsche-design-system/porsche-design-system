import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Components } from '@porsche-design-system/components';
import { ElementHandle } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-pin-code');
const getLabel = () => selectNode(page, 'p-pin-code >>> .label__text');
const getInput = () => selectNode(page, 'p-pin-code >>> input');
const getCurrentInput = () => selectNode(page, 'p-pin-code >>> #current-input');
const getMessage = () => selectNode(page, 'p-pin-code >>> .message');
const getHiddenInput = () => selectNode(page, 'p-pin-code input[slot="hidden-input"]');
const getActiveElementAriaLableInShadowRoot = (element: ElementHandle): Promise<string> => {
  return element.evaluate((el) => el.shadowRoot.activeElement.ariaLabel);
};

type InitOptions = {
  props?: Components.PPinCode;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initPinCode = (opts?: InitOptions) => {
  const { props = { name: 'name' }, slots, options } = opts || {};
  const { isWithinForm = false, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const markup = `${markupBefore}
<p-pin-code ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${message}
</p-pin-code>
${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

describe('label', () => {
  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await initPinCode();
    const pinCodeComponent = await getHost();
    expect(await getLabel()).toBeNull();

    await setProperty(pinCodeComponent, 'label', 'Some label');
    await waitForStencilLifecycle(page);

    expect(await getLabel()).not.toBeNull();
  });

  it('should focus input with id="current-input" when label text is clicked', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    const label = await getLabel();
    const input = await getCurrentInput();

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await label.click();

    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });

  it('should show hover state on input when label is hovered', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = await getLabel();
    const input = await getCurrentInput();
    const initialBorderColor = await getElementStyle(input, 'borderColor');

    expect(await getElementStyle(input, 'borderColor')).toBe(initialBorderColor);

    await label.hover();

    expect(await getElementStyle(input, 'borderColor')).not.toBe(initialBorderColor);
  });
});

describe('within form', () => {
  describe('hidden input', () => {
    it('should be rendered', async () => {
      await initPinCode({ options: { isWithinForm: true } });
      const hiddenInput = await getHiddenInput();

      expect(hiddenInput).not.toBeNull();
    });

    it('should not be visible', async () => {
      await initPinCode({ options: { isWithinForm: true } });
      const hiddenInput = await getHiddenInput();

      expect(await getElementStyle(hiddenInput, 'opacity')).toBe('0');
    });

    it('should sync with name, value, disabled and required props', async () => {
      await initPinCode({ options: { isWithinForm: true } });
      const host = await getHost();
      const hiddenInput = await getHiddenInput();

      expect(await getProperty(hiddenInput, 'name')).toBe('name');
      expect(await getAttribute(hiddenInput, 'value')).toBeNull();
      expect(await getProperty(hiddenInput, 'required')).toBeFalsy();
      expect(await getProperty(hiddenInput, 'disabled')).toBeFalsy();

      await setProperty(host, 'name', 'updatedName');
      await setProperty(host, 'value', ['1', '2', '3', '4']);
      await setProperty(host, 'disabled', true);
      await setProperty(host, 'required', true);

      await waitForStencilLifecycle(page);

      expect(await getProperty(hiddenInput, 'name')).toBe('updatedName');
      expect(await getProperty(hiddenInput, 'value')).toBe('1234');
      expect(await getProperty(hiddenInput, 'required')).toBeTruthy();
      expect(await getProperty(hiddenInput, 'disabled')).toBeTruthy();
    });
  });

  it('should submit on key Enter', async () => {
    await initPinCode({ options: { isWithinForm: true } });
    const host = await getHost();
    const input = await getCurrentInput();
    await setProperty(host, 'value', ['1', '2', '3', '4']);
    const form = await selectNode(page, 'form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });
});

// TODO
describe('events', () => {
  // keyboard, onInput, onPaste etc.
});

describe('update event', () => {
  it('should not render hidden input', async () => {
    await initPinCode();
    const hiddenInput = await getHiddenInput();

    expect(hiddenInput).toBeNull();
  });

  it('should emit update event on valid input', async () => {
    await initPinCode();
    const host = await getHost();
    await addEventListener(host, 'update');
    const input = await getCurrentInput();

    await input.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before input').toBe(0);

    page.keyboard.press('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([
      {
        value: ['1', '', '', ''],
      },
    ]);
  });

  // (alphanumeric, "Dead" (e.g. ^¨), "Process" (e.g.^ in firefox)
  it('should not emit update event on not valid input', async () => {
    await initPinCode();
    const host = await getHost();
    await addEventListener(host, 'update');
    const input = await getCurrentInput();

    await input.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before input').toBe(0);

    page.keyboard.press('a');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([]);
    expect(await getProperty(input, 'value')).toBe('');

    page.keyboard.press('^');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([]);
    expect(await getProperty(input, 'value')).toBe('');
  });

  it('should emit update event on backspace', async () => {
    await initPinCode();
    const host = await getHost();
    await setProperty(host, 'value', ['1', '2', '3', '']); // last empty input gets id="current-input"
    await addEventListener(host, 'update');
    const currentInput = await getCurrentInput();

    await currentInput.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before backspace').toBe(0);

    page.keyboard.press('Backspace');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after backspace').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after backspace').toEqual([
      {
        value: ['1', '2', '', ''],
      },
    ]);
  });

  it('should emit update event on backspace/delete', async () => {
    await initPinCode();
    const host = await getHost();
    await setProperty(host, 'value', ['1', '2', '3', '4']);
    await addEventListener(host, 'update');
    const input = await getInput();

    await input.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before delete').toBe(0);

    page.keyboard.press('Delete');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after delete').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after delete').toEqual([
      {
        value: ['', '2', '3', '4'],
      },
    ]);
  });
});

// TODO
describe('focus behavior', () => {});

describe('disabled state', () => {
  it('should have not-allowed cursor', async () => {
    await initPinCode({ props: { disabled: true } });
    const input = await getCurrentInput();

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  it('should not be focusable', async () => {
    await initPinCode({ props: { disabled: true }, options: { markupAfter: '<p-button>Some Button</p-button>' } });
    const button = await selectNode(page, 'p-button');
    await addEventListener(button, 'focus');

    expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
  });
});

describe('loading state', () => {
  it('should have not-allowed cursor', async () => {
    await initPinCode({ props: { loading: true } });
    const input = await getCurrentInput();

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  it('should be focusable but input can not be changed', async () => {
    await initPinCode({ props: { loading: true } });
    const input = await getCurrentInput();
    await addEventListener(input, 'focus');

    expect(await getProperty(input, 'value')).toBe('');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(1);

    await page.keyboard.press('1');
    await waitForStencilLifecycle(page);

    expect(await getProperty(input, 'value')).toBe('');
  });

  it('should be possible to navigate through inputs by key=Tab/Shift+Tab', async () => {
    await initPinCode({ props: { loading: true }, options: { markupAfter: '<p-button>Some Button</p-button>' } });
    const host = await getHost();
    const button = await selectNode(page, 'p-button');
    await addEventListener(button, 'focus');

    expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getActiveElementAriaLableInShadowRoot(host)).toBe('1-4');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getActiveElementAriaLableInShadowRoot(host)).toBe('2-4');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getActiveElementAriaLableInShadowRoot(host)).toBe('3-4');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getActiveElementAriaLableInShadowRoot(host)).toBe('4-4');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(button, 'focus')).counter, 'after focus').toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initPinCode();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-pin-code'], 'componentDidLoad: p-pin-code').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after prop change', async () => {
    await initPinCode();
    const host = await getHost();

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-pin-code'], 'componentDidUpdate: p-pin-code').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await initPinCode({ props: { label: 'Some label', description: 'Some description' } });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', state: 'error', message: 'Some error message' },
    });
    const input = await getCurrentInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should expose correct accessibility tree properties in disabled state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', disabled: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in loading state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', loading: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in required state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', required: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const input = await getCurrentInput();
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
