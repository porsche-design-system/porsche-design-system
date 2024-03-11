import { type ConsoleMessage, type ElementHandle, type Page } from '@playwright/test';
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
  ).asElement() as ElementHandle;
};

export const getOuterHTML = (el: ElementHandle): Promise<string> => el.evaluate((el) => el.outerHTML);

export const goto = async (page: Page, url: string): Promise<void> => {
  await page.goto(url);
  await page.waitForSelector('html.hydrated');
  await waitForComponentsReady(page);

  // it looks like vue event binding is a bit unreliable and happens after onMounted
  await new Promise((resolve) => setTimeout(resolve, 100));
};

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg: ConsoleMessage): void => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      const description = msg.text();
      if (description) {
        console.error(description);
      }
    }
  });
};
export const getConsoleErrorsAmount = (): number => {
  return consoleMessages.filter((x: ConsoleMessage): boolean => x.type() === 'error').length;
};
export const getConsoleWarningsAmount = (): number => {
  return consoleMessages.filter((x: ConsoleMessage): boolean => x.type() === 'warning').length;
};
