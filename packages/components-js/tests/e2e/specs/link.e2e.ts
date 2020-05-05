import { newE2EPage } from '@stencil/core/testing';

describe('link', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-link href="#">Some label</p-link>`);
    const el = await page.find('p-link >>> a');
    expect(el).not.toBeNull();
  });

  it('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-link href="#" id="hostElement">Some label</p-link></div>`);
    const link = await page.find('p-link >>> a');
    const host = await page.find('#hostElement');
    const wrapper = await page.find('div');
    const hostEventSpy = await wrapper.spyOnEvent('click');
    const wrapperEventSpy = await wrapper.spyOnEvent('click');
    await link.click();
    await host.click();

    for (const spy of [hostEventSpy, wrapperEventSpy]) {
      expect(spy.length).toBe(2);
      for (const event of spy.events) {
        expect(event.target.id).toBe(host.id);
      }
    }
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link href="#">Some label</p-link>
            <a href="#" id="after">after</a>
          </div>
    `);
    const link = await page.find('p-link');
    const before = await page.find('#before');
    const after = await page.find('#after');
    await before.focus();

    const beforeFocusSpy = await before.spyOnEvent('focus');
    const linkFocusSpy = await link.spyOnEvent('focus');
    const linkFocusinSpy = await link.spyOnEvent('focusin');
    const linkBlurSpy = await link.spyOnEvent('blur');
    const linkFocusoutSpy = await link.spyOnEvent('focusout');
    const afterFocusSpy = await after.spyOnEvent('focus');
    await page.keyboard.press('Tab');
    expect(linkFocusSpy.length).toBe(1);
    expect(linkFocusinSpy.length).toBe(1);
    expect(linkBlurSpy.length).toBe(0);
    expect(linkFocusoutSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(0);

    await page.keyboard.press('Tab');

    expect(linkFocusSpy.length).toBe(1);
    expect(linkFocusinSpy.length).toBe(1);
    expect(linkBlurSpy.length).toBe(1);
    expect(linkFocusoutSpy.length).toBe(1);
    expect(afterFocusSpy.length).toBe(1);

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(linkFocusSpy.length).toBe(2);
    expect(linkFocusinSpy.length).toBe(2);
    expect(linkBlurSpy.length).toBe(1);
    expect(linkFocusoutSpy.length).toBe(1);
    expect(beforeFocusSpy.length).toBe(0);

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');

    expect(linkFocusSpy.length).toBe(2);
    expect(linkFocusinSpy.length).toBe(2);
    expect(linkBlurSpy.length).toBe(2);
    expect(linkFocusoutSpy.length).toBe(2);
    expect(beforeFocusSpy.length).toBe(1);

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link href="#">Some label</p-link>
          </div>
    `);

    async function linkHasFocus() {
      return await page.evaluate(() => {
        const linkElement = document.querySelector('p-link') as HTMLElement;
        return document.activeElement === linkElement;
      });
    }

    const link = await page.find('p-link');
    const before = await page.find('#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement = document.querySelector('p-link') as HTMLElement;
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
