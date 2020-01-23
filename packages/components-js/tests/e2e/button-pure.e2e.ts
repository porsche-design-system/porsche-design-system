import { newE2EPage } from '@stencil/core/testing';

describe('button pure', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-button-pure>Some label</p-button-pure>`);
    const el = await page.find('p-button-pure >>> button');
    expect(el).not.toBeNull();
  });

  it('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-button-pure id="hostElement">Some label</p-button-pure></div>`);
    const button = await page.find('p-button-pure >>> button');
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
    await page.setContent(`<form onsubmit="return false;"><p-button-pure type="submit">Some label</p-button-pure></form>`);
    const button = await page.find('p-button-pure >>> button');
    const host = await page.find('p-button-pure');
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
              <p-button-pure type="submit">Some label</p-button-pure>
            </form>
          </div>
          <script>
            document.querySelector('#wrapper').addEventListener('click', function(event) {
              event.preventDefault();
            });
          </script>
    `);
    const button = await page.find('p-button-pure >>> button');
    const form = await page.find('form');
    const spy = await form.spyOnEvent('submit');
    await button.click();
    expect(spy.length).toBe(0);
  });

  it(`should not submit the form if button is disabled`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <form onsubmit="return false;">
              <p-button-pure type="submit" disabled="true">Some label</p-button-pure>
            </form>
          </div>
    `);
    const innerButton = await page.find('p-button-pure >>> button');
    const outerButton = await page.find('p-button-pure');
    const form = await page.find('form');
    const spy = await form.spyOnEvent('submit');
    await innerButton.click();
    await outerButton.click();
    expect(spy.length).toBe(0);
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button-pure>Some label</p-button-pure>
            <a href="#" id="after">after</a>
          </div>
    `);
    const button = await page.find('p-button-pure');
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
            <p-button-pure>Some label</p-button-pure>
          </div>
    `);

    async function buttonHasFocus() {
      return await page.evaluate(() => {
        const buttonElement = document.querySelector('p-button-pure') as HTMLElement;
        return document.activeElement === buttonElement;
      });
    }

    const button = await page.find('p-button-pure');
    const before = await page.find('#before');
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

  it(`should be removed from tab order for tabbable false`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-button-pure tabbable="false">Some label</p-button-pure>
            <a href="#" id="after">after</a>
          </div>
    `);

    const button = await page.find('p-button-pure');
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
});
