import { ConsoleMessage, ElementHandle, Page } from 'puppeteer';
import { selectNode, waitForComponentsReady } from '../helpers';
import { browser } from '../config';

const BASE_URL = 'http://localhost:4200';

describe('components', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const goto = async (url: string) => {
    await page.goto(`${BASE_URL}/${url}`);
    await waitForComponentsReady(page);
  };

  it('overview should work without errors', async () => {
    const consoleMessages: ConsoleMessage[] = [];
    page.on('console', (msg) => {
      consoleMessages.push(msg);
      if (msg.type() === 'error') {
        const { description } = msg.args()[0]['_remoteObject'];
        if (description) {
          console.log(description);
        }
      }
    });
    const getErrorsAmount = () => consoleMessages.filter((x) => x.type() === 'error').length;

    await goto('overview');

    expect(getErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount()).toBe(1);
  });

  it('should not dispatch events twice', async () => {
    await goto('overview');

    const tabsBar = await selectNode(page, 'p-tabs-bar');
    const [firstBtn, secondBtn, thirdBtn] = await tabsBar.$$('a');

    const clickElement = async (el: ElementHandle) => {
      await el.click();
      await page.waitForTimeout(50);
    };

    const counterKey = 'TAB_CHANGE_EVENT_COUNTER';
    const getCounterValue = () => page.evaluate((counterKey: string) => window[counterKey], counterKey);

    await page.evaluate((counterKey: string) => {
      window[counterKey] = 0;
      document.querySelector('p-tabs-bar').addEventListener('tabChange', () => {
        window[counterKey]++;
      });
    }, counterKey);

    await clickElement(secondBtn);
    expect(await getCounterValue()).toBe(1);

    await clickElement(thirdBtn);
    expect(await getCounterValue()).toBe(2);

    await clickElement(firstBtn);
    expect(await getCounterValue()).toBe(3);
  });

  it('should initialize component deterministically', async () => {
    await goto('initializer');
    await page.waitForTimeout(1000);

    const [component1, component2] = await page.$$('p-text-field-wrapper');
    const getOuterHTML = (elHandle: ElementHandle) => elHandle.evaluate((el) => el.outerHTML);

    const component1HTML = await getOuterHTML(component1);
    const component2HTML = await getOuterHTML(component2);

    expect(component1HTML).toEqual(component2HTML);
  });
});
