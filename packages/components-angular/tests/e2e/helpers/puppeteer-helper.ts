import { ConsoleMessage, ElementHandle, Page } from 'puppeteer';
import { waitForComponentsReady } from './stencil';

export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors =
    selectorParts.length > 1
      ? selectorParts
          .slice(1)
          .map((x) => `.shadowRoot.querySelector('${x.trim()}')`)
          .join('')
      : '';
  return (
    await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)
  ).asElement();
};

export const getOuterHTML = (el: ElementHandle): Promise<string> => el.evaluate((el) => el.outerHTML);

export const getElementProp = (el: ElementHandle, prop: string): Promise<string> =>
  el.evaluate((el, prop: string) => el[prop], prop);

export const BASE_URL = 'http://localhost:4200';
export const goto = async (page: Page, url: string) => {
  await page.goto(`${BASE_URL}/${url}`);
  await waitForComponentsReady(page);
};

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      const { description } = msg.args()[0]['_remoteObject'];
      if (description) {
        console.log(description);
      }
    }
  });
};
export const getConsoleErrorsAmount = () => consoleMessages.filter((x) => x.type() === 'error').length;
export const getConsoleWarningsAmount = () => consoleMessages.filter((x) => x.type() === 'warning').length;
