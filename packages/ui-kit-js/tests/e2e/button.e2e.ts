import { newE2EPage } from '@stencil/core/testing';

describe('button', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-button>Some label</p-button>`);
    const el = await page.find('p-button >>> button');
    expect(el).not.toBeNull();
  });

  it('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-button id="hostElement">Some label</p-button></div>`);
    const button = await page.find('p-button >>> button');
    const host = await page.find('#hostElement');
    const wrapper = await page.find('div');
    const hostEventSpy = await wrapper.spyOnEvent('click');
    const wrapperEventSpy = await wrapper.spyOnEvent('click');
    await button.click();
    await host.click();

    for (const spy of [hostEventSpy, wrapperEventSpy]) {
      expect(spy.length).toBe(2);
      for (const event of spy.events) {
        expect(event.target.id).toBe(host.id);
      }
    }
  });

  it(`submits outer forms on click, if it's type submit`, async () => {
    const page = await newE2EPage();
    await page.setContent(`<form onsubmit="return false;"><p-button type="submit">Some label</p-button></form>`);
    const button = await page.find('p-button >>> button');
    const host = await page.find('p-button');
    const form = await page.find('form');
    for(const triggerElement of [host, button]) {
      const spy = await form.spyOnEvent('submit');
      await triggerElement.click();
      expect(spy.length).toBe(1);
    }
  });

  it(`should not submit the form if default is prevented`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
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
    const button = await page.find('p-button >>> button');
    const form = await page.find('form');
    const spy = await form.spyOnEvent('submit');
    await button.click();
    expect(spy.length).toBe(0);
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button>Some label</p-button>
            <a href="#" id="after">after</a>
          </div>
    `);
    const button = await page.find('p-button');
    const before = await page.find('#before');
    const after = await page.find('#after');
    await before.focus();

    const beforeFocusSpy = await before.spyOnEvent('focus');
    const focusSpy = await button.spyOnEvent('focus');
    const focusinSpy = await button.spyOnEvent('focusin');
    const blurSpy = await button.spyOnEvent('blur');
    const focusoutSpy = await button.spyOnEvent('focusout');
    const afterFocusSpy = await after.spyOnEvent('focus');
    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(1);
    expect(focusinSpy.length).toBe(1);
    expect(blurSpy.length).toBe(0);
    expect(focusoutSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(0);

    await page.keyboard.press('Tab');

    expect(focusSpy.length).toBe(1);
    expect(focusinSpy.length).toBe(1);
    expect(blurSpy.length).toBe(1);
    expect(focusoutSpy.length).toBe(1);
    expect(afterFocusSpy.length).toBe(1);

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(2);
    expect(focusinSpy.length).toBe(2);
    expect(blurSpy.length).toBe(1);
    expect(focusoutSpy.length).toBe(1);
    expect(beforeFocusSpy.length).toBe(0);

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');

    expect(focusSpy.length).toBe(2);
    expect(focusinSpy.length).toBe(2);
    expect(blurSpy.length).toBe(2);
    expect(focusoutSpy.length).toBe(2);
    expect(beforeFocusSpy.length).toBe(1);

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button>Some label</p-button>
          </div>
    `);

    async function buttonHasFocus() {
      return await page.evaluate(() => {
        const buttonElement = document.querySelector('p-button') as HTMLElement;
        return document.activeElement === buttonElement;
      });
    }

    const button = await page.find('p-button');
    const before = await page.find('#before');
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
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button tabbable="false">Some label</p-button>
            <a href="#" id="after">after</a>
          </div>
    `);

    const button = await page.find('p-button');
    const before = await page.find('#before');
    const after = await page.find('#after');

    await before.focus();

    const focusSpy = await button.spyOnEvent('focus');
    const afterFocusSpy = await after.spyOnEvent('focus');

    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(1);
    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(1);
  });

  it(`should ignore native tab index and show a warning on console`, async () => {
    const page = await newE2EPage();
    const consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push({
        type: msg.type(),
        text: msg.text()
      });
    });
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button tabindex="1">Some label</p-button>
            <a href="#" id="after">after</a>
          </div>
    `);

    expect(consoleLogs.length).toBe(5); // <= should be 1 but Stencil outputs additional warnings unfortunately
    expect(consoleLogs[1].type).toBe('warning');
    expect(consoleLogs[1].text).toBe('You can not set the tabindex on the host element of Porsche UI-Kit components. Please use `tabbable` instead.');

    const button = await page.find('p-button');
    const before = await page.find('#before');
    const after = await page.find('#after');

    const focusSpy = await button.spyOnEvent('focus');
    const afterFocusSpy = await after.spyOnEvent('focus');

    await before.focus();

    expect(focusSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(0);
    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(1);
    expect(afterFocusSpy.length).toBe(0);
    await page.keyboard.press('Tab');
    expect(focusSpy.length).toBe(1);
    expect(afterFocusSpy.length).toBe(1);
  });
});
