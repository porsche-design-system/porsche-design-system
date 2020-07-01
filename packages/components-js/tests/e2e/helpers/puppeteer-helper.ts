import { ElementHandle, NavigationOptions, Page } from 'puppeteer';

export const setContentWithDesignSystem = async (
  page: Page,
  content: string,
  options: NavigationOptions = { waitUntil: 'networkidle0' }
): Promise<void> => {
  await page.setContent(
    `
      <script nomodule src="http://localhost:3333/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/porsche-design-system.esm.js"></script>
      ${content}
    `,
    options
  );
  await page.waitForSelector('html.hydrated');
};

export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors = selectorParts.length > 1 ? selectorParts.slice(1).map((x) => `.shadowRoot.querySelector('${x.trim()}')`).join('') : '';
  return (await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)).asElement();
};

export const getAttribute = async (element: ElementHandle, attribute: string): Promise<string> => {
  return await element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
}

export const getProperty = async (element: ElementHandle, prop: string): Promise<unknown> => {
  return (await element.getProperty(prop)).jsonValue();
}

export const getCssClasses = async (element: ElementHandle): Promise<string> => {
  return Object.values(await getProperty(element, 'classList')).join(' ');
}

export const getActiveElementId = async (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.id);
}

export const getActiveElementTagName = async (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.tagName);
}

type GetElementStyleOptions = { waitForTransition: boolean };

export const getElementStyle = async (element: ElementHandle, property: keyof CSSStyleDeclaration, opts?: GetElementStyleOptions): Promise<string> =>
  element.evaluate(async (el: Element, property: keyof CSSStyleDeclaration, opts?: GetElementStyleOptions): Promise<string> => {
    const style = getComputedStyle(el);
    if (opts?.waitForTransition) {
      await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000));
    }
    return style[property];
  }, property, opts);

export const getElementPosition = async (element: ElementHandle, selector: string): Promise<number> =>
  element.evaluate(async (el: Element, selector: string): Promise<number> => {
    let option: ChildNode = el.querySelector(selector);
    let pos = 0;
    while ((option = option.previousSibling) !== null) pos++;
    return pos;
  }, selector);
