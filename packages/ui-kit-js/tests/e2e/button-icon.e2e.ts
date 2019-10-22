import { newE2EPage } from '@stencil/core/testing';

describe('button-icon', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-button-icon></p-button-icon>`);
    const el = await page.find('p-button-icon >>> button');
    expect(el).not.toBeNull();
  });

  it('should dispatch correct click events', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><p-button-icon id="hostElement"></p-button-icon></div>`);
    const button = await page.find('p-button-icon >>> button');
    const host = await page.find('#hostElement');
    const wrapper = await page.find('div');
    const hostEventSpyPromise = wrapper.spyOnEvent('click');
    const wrapperEventSpyPromise = wrapper.spyOnEvent('click');
    await button.click();
    await host.click();

    for (const promise of [hostEventSpyPromise, wrapperEventSpyPromise]) {
      const spy = await promise;
      expect(spy.length).toBe(2);
      for (const event of spy.events) {
        expect(event.target.id).toBe(host.id);
      }
    }
  });

  it(`submits outer forms on click, if it's type submit`, async () => {
    const page = await newE2EPage();
    await page.setContent(`<form onsubmit="return false;"><p-button-icon type="submit"></p-button-icon></form>`);
    const button = await page.find('p-button-icon >>> button');
    const host = await page.find('p-button-icon');
    const form = await page.find('form');
    for(const triggerElement of [host, button]) {
      const spyPromise = form.spyOnEvent('submit');
      await triggerElement.click();
      const spy = await spyPromise;
      expect(spy.length).toBe(1);
    }
  });

  it(`should not submit the form if default is prevented`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
          <div id="wrapper">
            <form onsubmit="return false;">
              <p-button-icon type="submit"></p-button-icon>
            </form>
          </div>
          <script>
            document.querySelector('#wrapper').addEventListener('click', function(event) {
              event.preventDefault();
            });
          </script>
    `);
    const button = await page.find('p-button-icon >>> button');
    const form = await page.find('form');
    const spyPromise = form.spyOnEvent('submit');
    await button.click();
    const spy = await spyPromise;
    expect(spy.length).toBe(0);
  });
});
