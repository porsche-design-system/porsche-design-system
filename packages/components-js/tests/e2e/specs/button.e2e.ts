import {
  addEventListener,
  getIdFromNode,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks
} from "../helpers";
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('button', () => {

  let page: Page;
  beforeEach(async () => page = await getBrowser().newPage());
  afterEach(async () => await page.close());

  beforeAll(async () => {
    await initAddEventListener(page); // needed for setup
  })

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-button>Some label</p-button>`);
    const el = await selectNode(page, 'p-button >>> button');
    expect(el).not.toBeNull();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(page, `<div><p-button id="hostElement">Some label</p-button></div>`);

    const button = await selectNode(page, 'p-button >>> button');
    const host = await selectNode(page, '#hostElement');
    const wrapper = await selectNode(page, 'div');

    const events = [];
    await addEventListener(wrapper, 'click', (ev) => events.push(ev));

    await button.click();
    await host.click();
    await waitForEventCallbacks(page);

    expect(events.length).toBe(2);
    for (const event of events) {
      expect(event.target.id).toBe(await getIdFromNode(host));
    }
  });

  it(`submits outer forms on click, if it's type submit`, async () => {
    await setContentWithDesignSystem(page, `<form onsubmit="return false;"><p-button type="submit">Some label</p-button></form>`);
    const button = await selectNode(page, 'p-button >>> button');
    const host = await selectNode(page, 'p-button');
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    for (const triggerElement of [host, button]) {
      await triggerElement.click();
    }
    expect(calls).toBe(1);
  });

  it(`should not submit the form if default is prevented`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <form onsubmit="return false;">
              <p-button type="submit">Some label</p-button>
            </form>
          </div>
          <script>
            document.querySelector('#wrapper').addEventListener('click', function(event) {
              event.preventDefault();
            });
          </script>
    `);

    const button = await selectNode(page, 'p-button >>> button');
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await button.click();
    await waitForEventCallbacks(page);
    expect(calls).toBe(0);
  });

  it(`should not submit the form if button is disabled`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <form onsubmit="return false;">
              <p-button type="submit" disabled="true">Some label</p-button>
            </form>
          </div>
    `);

    const innerButton = await selectNode(page, 'p-button >>> button');
    const outerButton = await selectNode(page, 'p-button');
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await innerButton.click();
    await outerButton.click();
    await waitForEventCallbacks(page);
    expect(calls).toBe(0);
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button>Some label</p-button>
            <a href="#" id="after">after</a>
          </div>
    `);

    const button = await selectNode(page, 'p-button');
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');
    await before.focus();

    let beforeFocusCalls = 0;
    await addEventListener(before, 'focus', () => beforeFocusCalls++);
    let buttonFocusCalls = 0;
    await addEventListener(button, 'focus', () => buttonFocusCalls++)
    let buttonFocusInCalls = 0;
    await addEventListener(button, 'focusin', () => buttonFocusInCalls++);
    let buttonBlurCalls = 0;
    await addEventListener(button, 'blur', () => buttonBlurCalls++);
    let buttonFocusOutCalls = 0;
    await addEventListener(button, 'focusout', () => buttonFocusOutCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(1);
    expect(buttonFocusInCalls).toBe(1);
    expect(buttonBlurCalls).toBe(0);
    expect(buttonFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);

    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(1);
    expect(buttonFocusInCalls).toBe(1);
    expect(buttonBlurCalls).toBe(1);
    expect(buttonFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(2);
    expect(buttonFocusInCalls).toBe(2);
    expect(buttonBlurCalls).toBe(1);
    expect(buttonFocusOutCalls).toBe(1);
    expect(beforeFocusCalls).toBe(0);

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(2);
    expect(buttonFocusInCalls).toBe(2);
    expect(buttonBlurCalls).toBe(2);
    expect(buttonFocusOutCalls).toBe(2);
    expect(beforeFocusCalls).toBe(1);

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button>Some label</p-button>
          </div>
    `);

    const buttonHasFocus = () => page.evaluate(() =>
      document.activeElement === document.querySelector('p-button')
    )

    const button = await selectNode(page, 'p-button');
    const before = await selectNode(page, '#before');
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

  it(`should be removed from tab order for tabbable false`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button tabbable="false">Some label</p-button>
            <a href="#" id="after">after</a>
          </div>
    `);

    const button = await selectNode(page, 'p-button');
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    await before.focus();

    let buttonFocusCalls = 0;
    await addEventListener(button, 'focus', () => buttonFocusCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(0);
    expect(afterFocusCalls).toBe(1);
    await page.keyboard.press('Tab');
    expect(buttonFocusCalls).toBe(0);
    expect(afterFocusCalls).toBe(1);
  });
});
