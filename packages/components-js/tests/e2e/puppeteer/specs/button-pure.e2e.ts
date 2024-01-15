import {
  addEventListener,
  ClickableTests,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForImproveButtonHandlingForCustomElement,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-button-pure');
const getButton = () => selectNode(page, 'p-button-pure >>> button');
const getLoadingStatus = () => selectNode(page, 'p-button-pure >>> .status');
const getLoadingMessage = async () => (await getLoadingStatus()).evaluate((el) => el.textContent);

const initButtonPure = (opts?: { isLoading?: boolean; isDisabled?: boolean; withSubline?: boolean }): Promise<void> => {
  const { isLoading = false, isDisabled = false, withSubline = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button-pure ${loading} ${disabled}>
      Some label
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-button-pure>`
  );
};

const clickableTests: ClickableTests = [
  {
    state: 'disabled',
    setContent: async () => await initButtonPure({ isDisabled: true }),
  },
  {
    state: 'loading',
    setContent: async () => await initButtonPure({ isLoading: true }),
  },
];

for (const { state, setContent } of clickableTests) {
  it(`should not be clickable when ${state}`, async () => {
    await setContent();
    const host = await getHost();
    const button = await getButton();

    await addEventListener(host, 'click');

    await host.click();
    await button.click();

    const coords = await host.boundingBox();
    await page.mouse.click(coords.x + 1, coords.y + 1); // click the top left corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // click the bottom left corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // click the top right corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // click the bottom right corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // click the left center
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // click the right center
    await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // click the center center

    expect((await getEventSummary(host, 'click')).counter).toBe(0);
  });
}

it('should dispatch correct click events', async () => {
  await setContentWithDesignSystem(page, `<div><p-button-pure id="hostElement">Some label</p-button-pure></div>`);

  const wrapper = await selectNode(page, 'div');
  const host = await getHost();
  const button = await getButton();
  await addEventListener(wrapper, 'click');

  await button.click();
  await host.click();
  const { counter, targets } = await getEventSummary(wrapper, 'click');

  expect(counter).toBe(2);
  for (const target of targets) {
    expect(target.id).toBe('hostElement');
  }
});

describe('within form', () => {
  it("submits parent form on click if it's type submit", async () => {
    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;">
      <p-button-pure type="submit">Some label</p-button-pure>
    </form>`
    );
    const button = await getButton();
    const host = await getHost();
    const form = await selectNode(page, 'form');
    await addEventListener(form, 'submit');

    await button.click();
    await host.click();

    await waitForImproveButtonHandlingForCustomElement(page);
    expect((await getEventSummary(form, 'submit')).counter).toBe(2);
  });

  it('should not submit the form if default is prevented', async () => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <form onsubmit="return false;">
        <p-button-pure type="submit">Some label</p-button-pure>
      </form>
    </div>
    <script>
      document.querySelector('#wrapper').addEventListener('click', (e) => {
        e.preventDefault();
      });
    </script>`
    );

    const button = await getButton();
    const form = await selectNode(page, 'form');
    await addEventListener(form, 'submit');

    await button.click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  it('should not submit the form if button is disabled', async () => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <form onsubmit="return false;">
        <p-button-pure type="submit" disabled="true">Some label</p-button-pure>
      </form>
    </div>`
    );
    const button = await getButton();
    const outerButton = await getHost();
    const form = await selectNode(page, 'form');
    await addEventListener(form, 'submit');

    await button.click();
    await outerButton.click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  it("should submit parent form on click if it's type submit and pass name with value as param", async () => {
    const name = 'name';
    const value = 'Value';
    await setContentWithDesignSystem(
      page,
      `<form action="/">
      <p-button-pure type="submit" name="${name}" value="${value}">Some label</p-button-pure>
    </form>`
    );
    const host = await getHost();
    await host.click();

    await page.waitForNavigation();
    // Since the data in only available via the event submitter it is easier to test it by checking the request params
    expect(page.url()).toContain(`?${name}=${value}`);
  });
});

it('should trigger focus & blur events at the correct time', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-button-pure id="my-button-pure">Some label</p-button-pure>
      <a href="#" id="after">after</a>
    </div>`
  );

  const button = await getHost();
  const before = await selectNode(page, '#before');
  const after = await selectNode(page, '#after');

  await addEventListener(before, 'focus');
  await addEventListener(button, 'focus');
  await addEventListener(button, 'focusin');
  await addEventListener(button, 'blur');
  await addEventListener(button, 'focusout');
  await addEventListener(after, 'focus');

  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls initially').toBe(0);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls initially').toBe(0);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls initially').toBe(0);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls initially').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls after 1st tab').toBe(0);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls after 1st tab').toBe(0);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls after 1st tab').toBe(0);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-button-pure');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

  // tab back
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-button-pure');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(button, 'focus')).counter, 'buttonFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(button, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(button, 'blur')).counter, 'buttonBlurCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(button, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

  await page.keyboard.up('ShiftLeft');
});

it('should provide functionality to focus & blur the custom element', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-button-pure>Some label</p-button-pure>
    </div>`
  );

  const buttonHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-button-pure'));

  const button = await getHost();
  const before = await selectNode(page, '#before');
  await before.focus();
  expect(await buttonHasFocus()).toBe(false);
  await button.focus();
  expect(await buttonHasFocus()).toBe(true);
  await page.evaluate(() => {
    const buttonElement = document.querySelector('p-button-pure') as HTMLElement;
    buttonElement.blur();
  });
  expect(await buttonHasFocus()).toBe(false);
});

it('should submit form via enter key when type is submit', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <form>
      <input type="text" name="test" value="ok">
      <p-button-pure type="button">Submit</p-button-pure>
    </form>

    <script>
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
    })
    </script>`
  );

  const host = await getHost();
  const form = await selectNode(page, 'form');
  await addEventListener(form, 'submit');

  const focusElAndPressEnter = async (el: ElementHandle<Element>) => {
    await el.focus();
    await page.keyboard.press('Enter');
    await waitForImproveButtonHandlingForCustomElement(page);
  };

  const input = await selectNode(page, 'input');
  await focusElAndPressEnter(input);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1);

  await focusElAndPressEnter(host);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'button');
  await focusElAndPressEnter(host);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'reset');
  await focusElAndPressEnter(host);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'submit');
  await waitForStencilLifecycle(page);
  await focusElAndPressEnter(host);
  expect((await getEventSummary(form, 'submit')).counter).toBe(2);

  await focusElAndPressEnter(host);
  expect((await getEventSummary(form, 'submit')).counter).toBe(3);
});

describe('focus state', () => {
  it('should keep focus if state switches to loading', async () => {
    await initButtonPure();

    const host = await getHost();
    expect(await hasFocus(host)).toBe(false);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host), 'after Tab').toBe(true);

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(host), 'focus style on loading').toBe(true);

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(host), 'final focus style').toBe(true);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initButtonPure();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips with spinner', async () => {
    await initButtonPure({ isLoading: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initButtonPure();
    const host = await getHost();

    await setProperty(host, 'size', 'medium');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initButtonPure();
    const button = await getButton();
    const status = await getLoadingStatus();

    await expectA11yToMatchSnapshot(page, button);
    await expectA11yToMatchSnapshot(page, status, { interestingOnly: false });
  });

  it('should expose correct accessibility name when hide-label prop is set', async () => {
    await initButtonPure();
    const host = await getHost();
    const button = await getButton();
    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose accessibility tree description with slotted subline', async () => {
    await initButtonPure({ withSubline: true });
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initButtonPure();
    const host = await getHost();
    const button = await getButton();
    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
      'aria-expanded': true,
      'aria-haspopup': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Initial' });

    await setProperty(host, 'aria', {
      'aria-pressed': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' }); // need to split the test in 2, because aria-expanded and aria-pressed are invalid if used simultaneously. Also aria-pressed removes the accessible name.
  });

  it('should expose correct loading message initially: loading: false', async () => {
    await initButtonPure();

    expect(await getLoadingMessage()).toBe('');
  });

  it('should expose correct loading message initially: loading:true', async () => {
    await initButtonPure({ isLoading: true });

    expect(await getLoadingMessage()).toBe('Loading');
  });

  it('should expose correct loading message if loading is changed programmatically', async () => {
    await initButtonPure();
    const host = await getHost();

    expect(await getLoadingMessage()).toBe('');

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await getLoadingMessage()).toBe('Loading');

    await setProperty(host, 'loading', false);

    expect(await getLoadingMessage()).toBe('Loading finished');
  });
});
