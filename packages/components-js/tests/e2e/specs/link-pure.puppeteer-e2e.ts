import { newE2EPage } from '@stencil/core/testing';
import { getActiveElementId, getIdFromNode, selectNode, setContentWithDesignSystem } from '../helpers';

describe('link pure', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`<p-link-pure href="#">Some label</p-link-pure>`);
    const el = await selectNode('p-link-pure >>> a');
    expect(el).toBeDefined();
  });

  // ToDo: Discuss test usage.
  xit('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-link-pure href="#" id="hostElement">Some label</p-link-pure></div>`);
    const link = await page.find('p-link-pure >>> a');
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
    await setContentWithDesignSystem(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#">Some label</p-link-pure>
            <a href="#" id="after">after</a>
          </div>
    `);
    const link = await selectNode('p-link-pure');
    const before = await selectNode('#before');
    const after = await selectNode('#after');
    await before.focus();

    expect(await getActiveElementId()).toEqual(await getIdFromNode(before));

    await page.keyboard.press('Tab');
    expect(await getActiveElementId()).toEqual(await getIdFromNode(link));

    await page.keyboard.press('Tab');
    expect(await getActiveElementId()).toEqual(await getIdFromNode(after));

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId()).toEqual(await getIdFromNode(link));

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId()).toEqual(await getIdFromNode(before));
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#">Some label</p-link-pure>
          </div>
    `);

    // ToDo: Helper function?
    async function linkHasFocus() {
      return await page.evaluate(() => {
        const linkElement = document.querySelector('p-link-pure');
        return document.activeElement === linkElement;
      });
    }

    const link = await selectNode('p-link-pure');
    const before = await selectNode('#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement: HTMLElement = document.querySelector('p-link-pure');
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
