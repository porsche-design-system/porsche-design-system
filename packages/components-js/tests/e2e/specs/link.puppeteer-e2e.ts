import { newE2EPage } from '@stencil/core/testing';
import {getActiveElement, getIdFromNode, selectNode, setContentWithDesignSystem} from "../helpers";

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
    // const page = await newE2EPage();
    await setContentWithDesignSystem(`
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#" id="link">Some label</p-link>
        <a href="#" id="after">after</a>
      </div>
    `);

    const link = await selectNode('p-link');
    const before = await selectNode('#before');
    const after = await selectNode('#after');

    await before.focus();
    let el = await getActiveElement();
    expect(await getIdFromNode(el)).toEqual(await getIdFromNode(before));

    await page.keyboard.press('Tab');
    el = await getActiveElement();
    expect(await getIdFromNode(el)).toEqual(await getIdFromNode(link));

    await page.keyboard.press('Tab');
    el = await getActiveElement();
    expect(await getIdFromNode(el)).toEqual(await getIdFromNode(after));

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    el = await getActiveElement();
    expect(await getIdFromNode(el)).toEqual(await getIdFromNode(link));

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    el = await getActiveElement();
    expect(await getIdFromNode(el)).toEqual(await getIdFromNode(before));
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(`
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#">Some label</p-link>
      </div>
    `);

    const linkHasFocus = async () => await page.evaluate(() => {
      const linkElement = document.querySelector('p-link') as HTMLElement;
      return document.activeElement === linkElement;
    });

    const link = await selectNode('p-link');
    const before = await selectNode('#before');
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
