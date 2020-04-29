/*import { newE2EPage } from '@stencil/core/testing';*/
import { newBrowserPage, startPuppeteerBrowser } from '@stencil/core/testing/puppeteer/puppeteer-browser';
import * as puppeteer from 'puppeteer';
import { launch } from 'puppeteer';
import 'expect-puppeteer'


describe('p-icon', () => {
  it('should render', async () => {

    const requestInterceptor = (request) => {
      if (request.url().indexOf('.svg') >= 0) {
        console.log('position1');
        request.respond({
          status: 200,
          contentType: 'image/svg+xml',
          body: '<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg"></svg>'
        });
      }
      request.continue();
    };

    await page.setRequestInterception(true);
    console.log('position2');
    await page.on('request', requestInterceptor);
    await page.setContent(`
      <p-icon icon="question"></p-icon>
    `);
    console.log('position4');
    /*    await page.waitForResponse(response => response.url().indexOf('.svg') >= 0 && response.status() === 200);*/
    await page.waitFor(1000);

    const el = await page.find('p-icon');
    console.log('### el', el.shadowRoot.innerHTML);
    expect(el).not.toBe(null);
  })

});

