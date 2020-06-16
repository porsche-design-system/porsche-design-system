import { ElementHandle, JSHandle, NavigationOptions, Page } from 'puppeteer';

export const setContentWithDesignSystem = async (page: Page, content: string, options: NavigationOptions = {waitUntil: 'networkidle0'}): Promise<void> => {
  await page.setContent(`
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>
      ${content}
    `,
    options
  );
  await page.waitForSelector('html.hydrated');
};

// NODE CONTEXT

export const getProperty = async (element: ElementHandle, prop: string): Promise<unknown> => {
  return (await element.getProperty(prop)).jsonValue();
}

export const getCssClasses = async (element: ElementHandle): Promise<string> => {
  return Object.values(await getProperty(element, 'classList')).join(' ');
}

export const waitForCssClass = async (element: ElementHandle, selector: string, options: { isGone: boolean } = {isGone: false}): Promise<void> => {
  if (options.isGone) {
    while ((await getCssClasses(element)).indexOf(selector) >= 0) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  } else {
    while ((await getCssClasses(element)).indexOf(selector) === -1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
};

export const waitForInnerHTMLChange = async (page: Page, element: ElementHandle): Promise<void> => {
  const getInnerHTML = () => getProperty(element, 'innerHTML');
  const initialInnerHTML = await getInnerHTML();
  let runCounter = 0;
  // We need an runCounter as exit if the right innerHTML is already loaded
  while (runCounter < 100 && initialInnerHTML === await getInnerHTML()) {
    await page.waitFor(10);
    runCounter++;
  }
};

export const waitForEventCallbacks = async (page: Page): Promise<void> =>
  await page.waitFor(40);

// BROWSER CONTEXT

export const getActiveElementId = (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.id);
}

export const getActiveElementTagName = (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.tagName);
}

export const getAttributeFromHandle = async (element: ElementHandle | JSHandle<Element>, attribute: string): Promise<string> =>
  await element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);

export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors = selectorParts.length > 1 ? selectorParts.slice(1).map((x) => `.shadowRoot.querySelector('${x.trim()}')`).join('') : '';
  return (await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)).asElement();
};

type GetElementStyleOptions = { waitForTransition: boolean };

export const getElementStyle = (element: ElementHandle, property: keyof CSSStyleDeclaration, opts?: GetElementStyleOptions) =>
  element.evaluate(async (el: Element, property: keyof CSSStyleDeclaration, opts?: GetElementStyleOptions) => {
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
