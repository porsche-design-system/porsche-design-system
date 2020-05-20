import { ElementHandle, JSHandle, NavigationOptions } from 'puppeteer';

export const setContentWithDesignSystem = async (content: string, options: NavigationOptions = {waitUntil: 'networkidle2'}) =>
  await page.setContent(`
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
    options
  );

export const getElementStyle = (element: ElementHandle, opts: string, transition?: boolean) =>
  element.evaluate(async (el: Element, opts: string, transition?: boolean) => {
    const style = getComputedStyle(el);
    if (transition) {
      await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000));
    }
    return style[opts];
  }, opts, transition);

export const getElementPosition = (element: ElementHandle, selector: string) => element.evaluate((el:Element, selector: string) => {
  let option: ChildNode = el.querySelector(selector);
  let pos = 0;
  while((option = option.previousSibling) !== null) pos++;
  return pos;
}, selector);

// Node Context

export const getPropertyFromHandle = (node: ElementHandle, prop: string) => node.getProperty(prop).then(x => x.jsonValue());

export const getClassListFromHandle = (node: ElementHandle) => getPropertyFromHandle(node, 'classList').then((x) => Object.values(x).join(' '));

export const waitForSelector = async (node: ElementHandle, selector: string, opts?: { isGone: boolean }) => {
  if (opts?.isGone) {
    while ((await getClassListFromHandle(node)).indexOf(selector) >= 0) {
      await page.waitFor(10);
    }
  } else {
    while ((await getClassListFromHandle(node)).indexOf(selector) === -1) {
      await page.waitFor(10);
    }
  }
};

export const waitForInnerHTMLChange = async (node: ElementHandle) => {
  const getInnerHTML = () => getPropertyFromHandle(node, 'innerHTML');
  const initialInnerHTML = await getInnerHTML();
  let runCounter = 0;
  // We need an runCounter as exit if the right innerHTML is already loaded
  while (runCounter < 100 && initialInnerHTML === await getInnerHTML()) {
    await page.waitFor(10);
    runCounter++;
  }
};

export const waitForEventCallbacks = async () => await page.waitFor(40);

// Browser Context

// TODO: rename to getActiveElementHandle
export const getActiveElement = () => page.evaluateHandle(() => document.activeElement);

export const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

export const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);

export const getIdFromNode = async (node: ElementHandle | JSHandle<Element>) =>
  await node.evaluate(el => el.id);

export const getAttributeFromHandle = async (node: ElementHandle | JSHandle<Element>, attribute: string) =>
  await node.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);

export const getClassFromHandle = async (node: ElementHandle | JSHandle<Element>) => await getAttributeFromHandle(node, 'class');

export const selectNode = async (selector: string) => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors = selectorParts.length > 1 ? selectorParts.slice(1).map((x) => `.shadowRoot.querySelector('${x.trim()}')`).join('') : '';
  return (await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)).asElement();
};

export const getInnerHTMLFromShadowRoot = async (selector: string) => {
  const handle = await selectNode(selector);
  return handle.getProperty('innerHTML').then(x => x.jsonValue())
};

export const timeLogger = () => {
  const now = new Date();
  return now.getUTCSeconds() + ':' + now.getUTCMilliseconds()
};

let svgRequestCounter: number;

export const setSvgRequestInterceptor = (timeouts: number[]) => {
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
