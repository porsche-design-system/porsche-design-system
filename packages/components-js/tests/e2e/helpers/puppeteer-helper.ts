import { ElementHandle, NavigationOptions, Page } from 'puppeteer';

export const setContentWithDesignSystem = async (
  page: Page,
  content: string,
  options: NavigationOptions = { waitUntil: 'networkidle0' }
): Promise<void> => {
  await page.setContent(
    `
      <head>
        <base href="https://porsche.com"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript" src="http://localhost:8575/index.js"></script>
      </head>
      <body>
        <script type="text/javascript">porscheDesignSystem.load();</script>
        ${content}
      </body>
    `,
    options
  );
  await page.waitForSelector('html.hydrated');
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
  ).asElement();
};

export const getAttribute = async (element: ElementHandle, attribute: string): Promise<string> => {
  return await element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
};

export const getProperty = async (element: ElementHandle, prop: string): Promise<unknown> => {
  return (await element.getProperty(prop)).jsonValue();
};

export const getCssClasses = async (element: ElementHandle): Promise<string> => {
  return Object.values(await getProperty(element, 'classList')).join(' ');
};

export const getActiveElementTagNameInShadowRoot = async (element: ElementHandle): Promise<string> => {
  return element.evaluate((el) => el.shadowRoot.activeElement.tagName);
};

export const getActiveElementId = async (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.id);
};

export const getActiveElementTagName = async (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.tagName);
};

type Pseudo = '::before' | '::after';
type GetElementStyleOptions = {
  waitForTransition?: boolean;
  pseudo?: Pseudo;
};

export const getElementStyle = async (
  element: ElementHandle,
  property: keyof CSSStyleDeclaration,
  opts?: GetElementStyleOptions
): Promise<string> => {
  return await element.evaluate(
    async (el: Element, property: keyof CSSStyleDeclaration, opts?: GetElementStyleOptions): Promise<string> => {
      const options: GetElementStyleOptions = {
        waitForTransition: false,
        pseudo: null,
        ...opts,
      };
      const style = getComputedStyle(el, options.pseudo);
      if (options.waitForTransition) {
        await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000));
      }
      return style[property].toString();
    },
    property,
    opts
  );
};

type GetStyleOnFocusOptions = {
  pseudo?: Pseudo;
};

export const getOutlineStyle = async (element: ElementHandle, opts?: GetStyleOnFocusOptions): Promise<string> => {
  const options: GetStyleOnFocusOptions = {
    pseudo: null,
    ...opts,
  };
  const { pseudo } = options;
  return `${await getElementStyle(element, 'outline', { pseudo })} ${await getElementStyle(element, 'outlineOffset', {
    pseudo,
  })}`;
};

export const getBoxShadowStyle = async (element: ElementHandle, opts?: GetStyleOnFocusOptions): Promise<string> => {
  const options: GetStyleOnFocusOptions = {
    pseudo: null,
    ...opts,
  };
  const { pseudo } = options;
  return await getElementStyle(element, 'boxShadow', { pseudo });
};

export const getStyleOnFocus = async (
  element: ElementHandle,
  property: 'outline' | 'boxShadow' = 'outline',
  opts?: GetStyleOnFocusOptions
): Promise<string> => {
  await element.focus();
  return property === 'outline' ? await getOutlineStyle(element, opts) : await getBoxShadowStyle(element, opts);
};

export const setAttribute = async (element: ElementHandle, key: string, value: string): Promise<void> => {
  await element.evaluate((el, { key, value }) => el.setAttribute(key, value), { key, value });
};

export const waitForInheritedCSSTransition = async (page: Page): Promise<void> => {
  await page.waitForTimeout(500);
};

export const getElementIndex = async (element: ElementHandle, selector: string): Promise<number> =>
  element.evaluate(async (el: Element, selector: string): Promise<number> => {
    let option: ChildNode = el.querySelector(selector);
    let pos = 0;
    while ((option = option.previousSibling) !== null) {
      pos++;
    }
    return pos;
  }, selector);

export const getElementPositions = (
  page: Page,
  element: ElementHandle
): Promise<{ top: number; left: number; bottom: number; right: number }> =>
  page.evaluate((element) => {
    const { top, left, bottom, right } = element.getBoundingClientRect();
    return { top, left, bottom, right };
  }, element);

export const reattachElement = async (page: Page, selector: string): Promise<void> => {
  await page.evaluate((selector: string) => {
    const [element] = Array.from(document.getElementsByTagName(selector));
    element.remove();
    document.body.appendChild(element);
  }, selector);
};
