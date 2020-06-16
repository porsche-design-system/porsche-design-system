import { ElementHandle, JSHandle, NavigationOptions, Page } from 'puppeteer';

export const setContentWithDesignSystem = async (page: Page, content: string, options: NavigationOptions = {waitUntil: 'networkidle0'}): Promise<void> => {
  await page.setContent(`
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>
      ${content}
    `,
    options
  );
  await page.waitForSelector('html.hydrated');
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

export const getElementPosition = (element: ElementHandle, selector: string) => element.evaluate((el:Element, selector: string): number => {
  let option: ChildNode = el.querySelector(selector);
  let pos = 0;
  while((option = option.previousSibling) !== null) pos++;
  return pos;
}, selector);

// Node Context

export const getPropertyFromHandle = async (elementHandle: ElementHandle, prop: string): Promise<unknown> => (await elementHandle.getProperty(prop)).jsonValue();

export const getClassListFromHandle = (node: ElementHandle): Promise<string> => getPropertyFromHandle(node, 'classList').then((x) => Object.values(x).join(' '));

export const waitForSelector = async (page: Page, node: ElementHandle, selector: string, opts: { isGone: boolean } = { isGone: false }): Promise<void> => {
  if (opts.isGone) {
    while ((await getClassListFromHandle(node)).indexOf(selector) >= 0) {
      await page.waitFor(10);
    }
  } else {
    while ((await getClassListFromHandle(node)).indexOf(selector) === -1) {
      await page.waitFor(10);
    }
  }
};

export const waitForInnerHTMLChange = async (page: Page, node: ElementHandle): Promise<void> => {
  const getInnerHTML = () => getPropertyFromHandle(node, 'innerHTML');
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

// Browser Context

// TODO: rename to getActiveElementHandle
export const getActiveElement = (page: Page): Promise<JSHandle> =>
  page.evaluateHandle(() => document.activeElement);

export const getActiveElementId = (page: Page): Promise<string> =>
  page.evaluate(() => document.activeElement.id);

export const getActiveElementTagName = (page: Page): Promise<string> =>
  page.evaluate(() => document.activeElement.tagName);

export const getIdFromNode = async (node: ElementHandle | JSHandle<Element>): Promise<string> =>
  await node.evaluate(el => el.id);

export const getAttributeFromHandle = async (node: ElementHandle | JSHandle<Element>, attribute: string): Promise<string> =>
  await node.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);

export const hasAttribute = async (node: ElementHandle | JSHandle<Element>, attribute: string): Promise<boolean> =>
  await node.evaluate((el: HTMLElement, attr: string) => el.hasAttribute(attr), attribute);

export const getClassFromHandle = async (node: ElementHandle | JSHandle<Element>): Promise<string> =>
  await getAttributeFromHandle(node, 'class');

export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors = selectorParts.length > 1 ? selectorParts.slice(1).map((x) => `.shadowRoot.querySelector('${x.trim()}')`).join('') : '';
  return (await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)).asElement();
};

export const getInnerHTMLFromShadowRoot = async (page: Page, selector: string): Promise<unknown> => {
  const handle = await selectNode(page, selector);
  return handle.getProperty('innerHTML').then(x => x.jsonValue())
};

export const timeLogger = (): string => {
  const now = new Date();
  return now.getUTCSeconds() + ':' + now.getUTCMilliseconds()
};

let svgRequestCounter: number;

export const setSvgRequestInterceptor = (page: Page, timeouts: number[]): void => {
  svgRequestCounter = 0;
  page.removeAllListeners('request');
  page.on('request', (req) => {
    const url = req.url();

    if (url.endsWith('.svg')) {
      const iconName = url.match(/icons\/(.*)\.min/)[1];
      const delay = timeouts[svgRequestCounter] ?? 0;

      console.log(`REQ ${svgRequestCounter}: delay = ${delay}, icon = ${iconName}, time = ${timeLogger()}`);
      setTimeout(() => {
        req.respond({
          status: 200,
          contentType: 'image/svg+xml',
          body: `<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg">${iconName}</svg>`,
        });
      }, delay);
      svgRequestCounter++;
    } else {
      req.continue();
    }
  });
};
