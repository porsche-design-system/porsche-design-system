import { newE2EPage } from '@stencil/core/testing';
import { componentsReady } from '@porsche-design-system/components-js';

describe('components ready', () => {

  it('should have content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-text>Some label</p-text>`);
    const pText = await page.find('p-text');

    expect(pText.innerText).toBe('Some label');
  });

  it('should have content', async () => {
    const page = await newE2EPage();

    await page.evaluate(() => {
      const element = document.createElement('p-text');
      element.innerText = 'Hello World';
      document.body.appendChild(element);
    });

    console.log('before components ready');
    await componentsReady();
    console.log('after components ready');

    const pText = await page.find('p-text');

    expect(pText.innerText).toBe('Hello World');
  });
});
