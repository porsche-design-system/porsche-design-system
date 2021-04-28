import { ConsoleMessage, Page } from 'puppeteer';
import { getElementProp, getOuterHTML, goto, selectNode, waitForComponentsReady } from '../helpers';
import { browser } from '../config';

describe('components', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

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

    await goto(page, 'overview');

    expect(getErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount()).toBe(1);
  });

  describe('without prefix', () => {
    it('should initialize component deterministically', async () => {
      await goto(page, 'core-initializer');
      await page.waitForTimeout(1000);

      const [component1, component2] = await page.$$('p-text-field-wrapper');

      const component1HTML = await getOuterHTML(component1);
      const component2HTML = await getOuterHTML(component2);

      expect(component1HTML).toBe(component2HTML);

      if (component1HTML !== component2HTML) {
        console.log('component1HTML', component1HTML);
        console.log('component2HTML', component2HTML);
      }
    });
  });

  describe('with prefix', () => {
    const regularSelector = 'p-text-field-wrapper';
    const prefixedSelector = `my-prefix-${regularSelector}`;

    it('should initialize angular component', async () => {
      await goto(page, 'core-initializer-prefixed');

      const prefixedComponent = await selectNode(page, prefixedSelector);

      expect(await getElementProp(prefixedComponent, 'description')).toBe('Some Description');
      expect(await getElementProp(prefixedComponent, 'label')).toBe('Some Label');
    });
  });

  const getErrorsAmount = (messages: ConsoleMessage[]) => messages.filter((x) => x.type() === 'error').length;

  describe('Form Wrapper with slotted input', () => {
    it('should have no console error if input type is bound', async () => {
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
      await goto(page, 'form-wrapper-binding');

      await page.select('select', 'overview');
      await waitForComponentsReady(page);
      await page.select('select', 'form-wrapper-binding');

      expect(getErrorsAmount(consoleMessages)).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getErrorsAmount(consoleMessages)).toBe(1);
    });
  });
});
