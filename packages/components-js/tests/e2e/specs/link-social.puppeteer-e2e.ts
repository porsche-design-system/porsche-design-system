import { getActiveElementId, getIdFromNode, selectNode, setContentWithDesignSystem } from '../helpers';
import { newE2EPage } from '@stencil/core/testing';

describe('link social', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`<p-link-social href="#" icon="logo-facebook">Some label</p-link-social>`);
    const el = await selectNode('p-link-social >>> a');
    expect(el).toBeDefined();
  });

  // ToDo: Discuss test usage.
  xit('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-link-social href="#" icon="logo-facebook" id="hostElement">Some label</p-link-social></div>`);
    const link = await page.find('p-link-social >>> a');
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
            <p-link-social href="#" icon="logo-facebook">Some label</p-link-social>
            <a href="#" id="after">after</a>
          </div>
    `);
    const link = await selectNode('p-link-social');
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
            <p-link-social href="#" icon="logo-facebook">Some label</p-link-social>
          </div>
    `);

    // ToDo: Helper function?
    async function linkHasFocus() {
      return await page.evaluate(() => {
        const linkElement = document.querySelector('p-link-social') as HTMLElement;
        return document.activeElement === linkElement;
      });
    }

    const link = await selectNode('p-link-social');
    const before = await selectNode('#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement = document.querySelector('p-link-social') as HTMLElement;
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
