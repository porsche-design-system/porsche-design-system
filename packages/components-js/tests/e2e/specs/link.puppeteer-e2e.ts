import { newE2EPage } from '@stencil/core/testing';
import { selectNode, setContentWithDesignSystem } from '../helpers';

describe('link', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`<p-link href="#">Some label</p-link>`);
    const el = await selectNode('p-link >>> a');
    expect(el).not.toBeNull();
  });

  // ToDo: Discuss test usage.
  xit('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(`<div><p-link href="#testpage" id="hostElement">Some label</p-link></div>`);
    const link = await selectNode('p-link >>> a');
    const host = await selectNode('#hostElement');
    const hostEventSpy = jest.spyOn(link, 'click');
    const wrapperEventSpy = jest.spyOn(host,'click');
    console.log('###pageUrl1', page.url());
    await link.click();
    console.log('###pageUrl2', page.url());
    await page.goBack();
    console.log('###pageUrl2', page.url());
    await host.click();
    console.log('###pageUrl3', page.url());


    for (const spy of [hostEventSpy, wrapperEventSpy]) {
      expect(spy.mock.instances.length).toBe(1);
/*     for (const event of spy.mock.instances) {
        expect(event.target.id).toBe(host.getProperty('id'));
      }*/
    }
  });

  fit(`should trigger focus&blur events at the correct time`, async () => {
    await setContentWithDesignSystem(`
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link href="#">Some label</p-link>
            <a href="#" id="after">after</a>
          </div>
    `);
    const pageDocument = await page.evaluateHandle('shadowRoot');
    const link = await selectNode('p-link');
/*    const before = await selectNode('#before');*/
/*    const after = await selectNode('#after');*/
    await page.focus('#before');


/*    const beforeFocusSpy = jest.spyOn(before, 'focus');*/
    const linkFocusSpy = jest.spyOn(link, 'focus');
/*    const linkFocusinSpy = await link.spyOnEvent('focusin');
    const linkBlurSpy = await link.spyOnEvent('blur');
    const linkFocusoutSpy = await link.spyOnEvent('focusout');
    const afterFocusSpy = await after.spyOnEvent('focus');*/
    await page.keyboard.press('Tab');
    expect(pageDocument.getProperty('activeElement').then(x => x.jsonValue())).toEqual(link);


    expect(linkFocusSpy).toHaveBeenCalledTimes(1);
/*    expect(linkFocusinSpy.length).toBe(1);
    expect(linkBlurSpy.length).toBe(0);
    expect(linkFocusoutSpy.length).toBe(0);
    expect(afterFocusSpy.length).toBe(0);*/

    await page.keyboard.press('Tab');
/*

    expect(linkFocusSpy.length).toBe(1);
    expect(linkFocusinSpy.length).toBe(1);
    expect(linkBlurSpy.length).toBe(1);
    expect(linkFocusoutSpy.length).toBe(1);
    expect(afterFocusSpy.length).toBe(1);
*/

/*    // tab back
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

    await page.keyboard.up('ShiftLeft');*/
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
