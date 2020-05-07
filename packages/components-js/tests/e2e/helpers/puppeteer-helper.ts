import { ElementHandle, JSHandle, NavigationOptions } from 'puppeteer';

export const setContentWithDesignSystem = async (content: string, options: NavigationOptions = {waitUntil: 'networkidle0'}) =>
  await page.setContent(`
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
    options
  );

type GetBoxShadowOptions =  {waitForTransition: boolean}

export const getBoxShadow = (element: ElementHandle<Element>, opts?: GetBoxShadowOptions) =>
  element.evaluate(async (el, opts?: GetBoxShadowOptions) => {
    const style = getComputedStyle(el);
    if (opts?.waitForTransition) {
      await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000));
    }
    return style.boxShadow;
  }, opts);

// TODO: rename to getActiveElementHandle
export const getActiveElement = () => page.evaluateHandle(() => document.activeElement);

export const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

export const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);

export const getIdFromNode = async (node: ElementHandle<Element> | JSHandle<Element>) =>
  await node.getProperty('id').then(x => x.jsonValue());

export const getAttributeFromHandle = async (node: ElementHandle<Element> | JSHandle<Element>, attribute: string) =>
  await page.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), node, attribute);

export const getClassFromHandle = async (node: ElementHandle<Element> | JSHandle<Element>) => await getAttributeFromHandle(node, 'class');

export const selectNode = async (selector: string) => {
  const selectorParts = selector.split('>>>');
  return (await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${selectorParts[1] ? `.shadowRoot.querySelector('${selectorParts[1].trim()}')` : ''}`)).asElement();
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

export const setRequestInterceptor = (timeouts: number[]) => {
  svgRequestCounter = 0;
  page.removeAllListeners('request');
  page.on('request', (req) => {
    const url = req.url();

    if (url.indexOf('.svg') >= 0) {
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
