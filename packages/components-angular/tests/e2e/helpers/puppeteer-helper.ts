import { ElementHandle, Page } from 'puppeteer';

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
