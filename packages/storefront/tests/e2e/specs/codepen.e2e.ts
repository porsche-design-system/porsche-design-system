import { baseURL } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should have working codepen button', async () => {
  await page.goto(`${baseURL}/components/button/examples`, { waitUntil: 'networkidle0' });

  const codepenForm = await page.$('.playground form');
  const codepenDataInput = await codepenForm.$('input[name=data]');
  const codepenButton = await codepenForm.$('p-button[type=submit]');

  // remove target="_blank" to submit form inside same tab
  await codepenForm.evaluate((el: HTMLFormElement) => (el.target = ''));
  // get form data
  const codepenData = JSON.parse(await codepenDataInput.evaluate((el: HTMLInputElement) => el.value));

  // bypass captcha in headless chrome
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
  );
  await codepenButton.click();

  // now we're on the codepen website
  await page.waitForNetworkIdle();
  const codeMirror = await page.$('.CodeMirror-code');
  // get innerText, strip line numbers and weird ​ special char
  const codeMirrorInnerText = (await codeMirror.evaluate((el: HTMLElement) => el.innerText)).replace(/\d+\n|​/g, '');

  expect(page.url()).toMatch(/https:\/\/codepen|.io\/pen\/?\?&editors=100/);
  expect(codepenData.html).toBe(codeMirrorInnerText);
});
