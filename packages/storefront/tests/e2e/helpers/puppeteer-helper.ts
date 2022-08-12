import { ConsoleMessage, Page, ElementHandle } from 'puppeteer';

const consoleMessages: ConsoleMessage[] = [];

export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg);
      console.log(msg.text());
    }
  });
};
export const getConsoleErrorsAmount = () => consoleMessages.length;

export const getElementInnerText = (element: ElementHandle): Promise<string> =>
  element.evaluate((el) => (el as HTMLElement).innerText);

export const getFrameworkButtons = async (page: Page): Promise<ElementHandle<Node>[]> =>
  (
    await Promise.all([
      page.$x("//button[text() = 'Vanilla JS']"),
      page.$x("//button[text() = 'Angular']"),
      page.$x("//button[text() = 'React']"),
    ])
  )
    .map(([handle]) => handle)
    .flat()
    .filter((x) => x); // get rid of null values
