import { Locator, type Page, expect, test } from '@playwright/test';
import {
  ClickableTests,
  addEventListener,
  getActiveElementId,
  getEventSummary,
  getFormDataValue,
  getLifecycleStatus,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForImproveButtonHandlingForCustomElement,
  waitForStencilLifecycle,
} from '../helpers';

skipInBrowsers(['firefox', 'webkit']);

const getHost = (page: Page) => page.locator('p-button');
const getButton = (page: Page) => page.locator('p-button button');
const getForm = (page: Page) => page.locator('form');

const initButton = (page: Page, opts?: { isLoading?: boolean; isDisabled?: boolean }): Promise<void> => {
  const { isLoading = false, isDisabled = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button ${loading} ${disabled}>
      Some label
    </p-button>`
  );
};

const clickableTests: ClickableTests = [
  {
    state: 'disabled',
    setContent: async (page: Page) => await initButton(page, { isDisabled: true }),
  },
  {
    state: 'loading',
    setContent: async (page: Page) => await initButton(page, { isLoading: true }),
  },
];

for (const { state, setContent } of clickableTests) {
  test(`should not be clickable when ${state}`, async ({ page }) => {
    await setContent(page);
    const host = getHost(page);
    const button = getButton(page);
    await addEventListener(host, 'click');

    await host.click();
    await button.click({ force: true });

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

test('should dispatch correct click events', async ({ page }) => {
  await setContentWithDesignSystem(page, `<div><p-button id="hostElement">Some label</p-button></div>`);

  const wrapper = page.locator('div');
  const host = getHost(page);
  const button = getButton(page);
  await addEventListener(wrapper, 'click');

  await button.click();
  await host.click();
  const { counter, targets } = await getEventSummary(wrapper, 'click');

  expect(counter).toBe(2);
  for (const target of targets) {
    expect(target.id).toBe('hostElement');
  }
});

test.describe('form', () => {
  test("should submit parent form on click if it's type submit", async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;">
      <p-button type="submit">Some label</p-button>
    </form>`
    );
    const button = getButton(page);
    const host = getHost(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    await button.click();
    await host.click();

    await waitForImproveButtonHandlingForCustomElement(page);
    expect((await getEventSummary(form, 'submit')).counter).toBe(2);
  });

  test('Should include name and associated value in FormData on click, if the submit button is outside the form', async ({
    page,
  }) => {
    const value = 'Some value';
    const formId = 'myForm';
    const name = 'some-name';

    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;" id="myForm">
        <p-textarea name="${name}" label="Some Label" value="${value}"></p-textarea>
      </form>
      <p-button type="submit" form="${formId}">Submit</p-button>
    `
    );

    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe('Some value');
  });

  test('Should reset value on click, if the reset button is outside the form', async ({ page }) => {
    const value = 'Some value';
    const formId = 'myForm';
    const name = 'some-name';
    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;" id="${formId}">
        <p-textarea name="${name}" label="Some Label" value="${value}"></p-textarea>
      </form>
      <p-button type="reset" form="${formId}">Reset</p-button>
    `
    );

    const form = getForm(page);
    const textarea = page.locator('textarea');
    const newValue = 'New value';
    await textarea.fill(newValue);

    await waitForStencilLifecycle(page);
    await expect(textarea).toHaveValue(newValue);

    await addEventListener(form, 'reset');
    expect((await getEventSummary(form, 'reset')).counter).toBe(0);

    await page.locator('button[type="reset"]').click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'reset')).counter).toBe(1);
    await expect(textarea).toHaveValue(value);
  });

  test('should not submit the form if default is prevented', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <form onsubmit="return false;">
        <p-button type="submit">Some label</p-button>
      </form>
    </div>
    <script>
      document.querySelector('#wrapper').addEventListener('click', (e) => {
        e.preventDefault();
      });
    </script>`
    );

    const button = getButton(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    await button.click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should not submit the form if button is disabled', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <form onsubmit="return false;">
        <p-button type="submit" disabled="true">Some label</p-button>
      </form>
    </div>`
    );

    const host = getHost(page);
    const button = getButton(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    await button.click({ force: true });
    await host.click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test("should submit parent form on click if it's type submit and pass name with value as param", async ({ page }) => {
    const name = 'name';
    const value = 'Value';
    await setContentWithDesignSystem(
      page,
      `<form action="/packages/components-js/public">
      <p-button type="submit" name="${name}" value="${value}">Some label</p-button>
    </form>`
    );

    const host = getHost(page);
    await host.click();

    const urlPart = `?${name}=${value}`;

    await page.waitForURL(`**/*${urlPart}`);
    // Since the data in only available via the event submitter it is easier to test it by checking the request params
    expect(page.url()).toContain(urlPart);
  });

  test("should submit the form when a 'submit' type button outside the form is clicked, passing the button's name and value as parameters", async ({
    page,
  }) => {
    const name = 'name';
    const value = 'Value';
    await setContentWithDesignSystem(
      page,
      `<form action="/packages/components-js/public" id="myForm"></form>
    <p-button type="submit" name="${name}" value="${value}" form="myForm">Some label</p-button>`
    );

    const host = getHost(page);
    await host.click();

    const urlPart = `?${name}=${value}`;

    await page.waitForURL(`**/*${urlPart}`);
    // Since the data in only available via the event submitter it is easier to test it by checking the request params
    expect(page.url()).toContain(urlPart);
  });

  test("Should submit the correct FormData when the button's value is updated programmatically before submission", async ({
    page,
  }) => {
    const name = 'name';
    const value = 'Value';
    const newValue = 'NewValue';
    await setContentWithDesignSystem(
      page,
      `<form action="/packages/components-js/public">
      <p-button type="submit" name="${name}" value="${value}">Some label</p-button>
      </form>`
    );

    const host = getHost(page);
    await expect(host).toHaveJSProperty('value', value);

    await setProperty(host, 'value', newValue);
    await waitForStencilLifecycle(page);
    await expect(host).toHaveJSProperty('value', newValue);

    await host.click();

    const urlPart = `?${name}=${newValue}`;

    await page.waitForURL(`**/*${urlPart}`);
    // Since the data in only available via the event submitter it is easier to test it by checking the request params
    expect(page.url()).toContain(urlPart);
  });
});

test('should trigger focus & blur events at the correct time', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-button id="my-button">Some label</p-button>
      <a href="#" id="after">after</a>
    </div>`
  );

  const button = getHost(page);
  const before = page.locator('#before');
  const after = page.locator('#after');

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
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-button');

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
  expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-button');

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

test('should provide functionality to focus & blur the custom element', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-button>Some label</p-button>
    </div>`
  );

  const buttonHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-button'));

  const button = getHost(page);
  const before = page.locator('#before');
  await before.focus();
  expect(await buttonHasFocus()).toBe(false);
  await button.focus();
  expect(await buttonHasFocus()).toBe(true);
  await page.evaluate(() => {
    const buttonElement = document.querySelector('p-button') as HTMLElement;
    buttonElement.blur();
  });
  expect(await buttonHasFocus()).toBe(false);
});

test('should submit form via enter key when type is submit', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <form>
      <input type="text" name="test" value="ok">
      <p-button type="button">Submit</p-button>
    </form>

    <script>
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
    })
    </script>`
  );

  const host = getHost(page);
  const form = page.locator('form');
  await addEventListener(form, 'submit');

  const focusElAndPressEnter = async (locator: Locator) => {
    await locator.focus();
    await page.keyboard.press('Enter');
    await waitForImproveButtonHandlingForCustomElement(page);
  };

  const input = page.locator('input');
  await focusElAndPressEnter(input);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1);

  const button = getHost(page);
  await focusElAndPressEnter(button);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'button');
  await focusElAndPressEnter(button);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'reset');
  await focusElAndPressEnter(button);
  expect((await getEventSummary(form, 'submit')).counter).toBe(1); // type isn't submit, yet

  await setProperty(host, 'type', 'submit');
  await waitForStencilLifecycle(page);
  await focusElAndPressEnter(button);
  expect((await getEventSummary(form, 'submit')).counter).toBe(2);

  await focusElAndPressEnter(button);
  expect((await getEventSummary(form, 'submit')).counter).toBe(3);
});

test.describe('focus state', () => {
  test('should keep focus if state switches to loading', async ({ page }) => {
    await initButton(page);

    const host = getHost(page);
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

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initButton(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips with spinner', async ({ page }) => {
    await initButton(page, { isLoading: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);
    expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initButton(page);
    const host = getHost(page);

    await setProperty(host, 'icon', 'arrow-right');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-button'], 'componentDidUpdate: p-button').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });
});
