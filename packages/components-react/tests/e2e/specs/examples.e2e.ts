import { ConsoleMessage, Page } from 'puppeteer';
import { goto } from '../helpers';
import { browser } from '../config';

describe('examples', () => {
  let page: Page;
  let consoleMessages: ConsoleMessage[] = [];

  beforeEach(async () => {
    page = await browser.newPage();

    consoleMessages = []; // reset
    page.on('console', (msg) => {
      consoleMessages.push(msg);
      if (msg.type() === 'error') {
        const { description } = msg.args()[0]['_remoteObject'];
        if (description) {
          console.log(description);
        }
      }
    });
  });
  afterEach(async () => await page.close());

  const getErrorsAmount = () => consoleMessages.filter((x) => x.type() === 'error').length;

  it('table example basic should work without errors', async () => {
    await goto(page, 'table-example-basic');
    expect(getErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount()).toBe(1);
  });

  it('table example advanced should work without errors', async () => {
    await goto(page, 'table-example-advanced');
    expect(getErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount()).toBe(1);
  });
});
