import {
  getActiveElementId,
  getIdFromNode,
  selectNode,
  setContentWithDesignSystem
} from "../helpers";

describe('link', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`<p-link href="#">Some label</p-link>`);
    const el = await selectNode('p-link >>> a');
    expect(el).toBeDefined();
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

  it(`should trigger focus&blur events at the correct time`, async () => {
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
        <p-link href="#">Some label</p-link>
      </div>
    `);

    const linkHasFocus = async () => await page.evaluate(() => {
      const linkElement = document.querySelector('p-link');
      return document.activeElement === linkElement;
    });

    const link = await selectNode('p-link');
    const before = await selectNode('#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement: HTMLElement = document.querySelector('p-link');
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
