import type { Page } from 'puppeteer';
import type { ElementHandle } from 'puppeteer';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of react vrt app
  return page.evaluate(() => (window as any).componentsReady());
};

const BASE_URL = 'http://localhost:3000';

export const goto = async (page: Page, url: string) => {
  await page.goto(`${BASE_URL}/${url}`);
  await page.waitForSelector('html.hydrated');
  await waitForComponentsReady(page);
};

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

export const getAttribute = (element: ElementHandle, attribute: string): Promise<string> => {
  return element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
};
