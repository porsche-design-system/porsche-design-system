import type { ConsoleMessage, ElementHandle, Page, WaitForOptions, SnapshotOptions } from 'puppeteer';
import { waitForComponentsReady } from './stencil';
import type { TagName } from '@porsche-design-system/shared';
import { ComponentMeta, getComponentMeta } from '@porsche-design-system/shared';
import * as beautify from 'js-beautify';

type Options = WaitForOptions & {
  enableLogging?: boolean;
  injectIntoHead?: string;
};

export type ClickableTests = {
  state: string;
  setContent: () => Promise<void>;
}[];

export const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options): Promise<void> => {
  const options: Options = {
    waitUntil: 'networkidle0',
    injectIntoHead: '',
    ...opts,
  };

  let lifeCycleLogger = '';
  if (options.enableLogging) {
    enableBrowserLogging(page);
    lifeCycleLogger = `console.log(eventName + (eventName.includes('Did') ? ' ' : ''), tagName, new Date().toISOString());`;
  }

  await page.setContent(
    `<!DOCTYPE html>
    <html>
      <head>
        <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript" src="http://localhost:8575/index.js"></script>
        <link rel="stylesheet" href="assets/styles.css" >
        ${options.injectIntoHead}
      </head>
      <body>
        <script type="text/javascript">porscheDesignSystem.load();</script>
        <script>
          let updatingCount = 0;
          let timeout;
          window.componentsUpdatedPromise = undefined;
          let resolveComponentsUpdatedPromise;

          window.checkComponentsUpdatedPromise = () => {
            if (updatingCount === 0) {
              timeout = window.setTimeout(() => {
                resolveComponentsUpdatedPromise();
                createComponentsUpdatedPromise();
              }, 40); // TODO: reduce this timeout once component lifecycles are working as intended
            }
          };

          const createComponentsUpdatedPromise = () => {
            window.componentsUpdatedPromise = new Promise((resolve) => {
              resolveComponentsUpdatedPromise = resolve;
            });
          };

          createComponentsUpdatedPromise();

          window.addEventListener('stencil_componentWillUpdate', () => {
            updatingCount++;
            if (timeout) {
              window.clearTimeout(timeout);
            }
          });

          window.addEventListener('stencil_componentDidUpdate', () => {
            updatingCount--;
            window.checkComponentsUpdatedPromise();
          });

          // initial status
          window['${LIFECYCLE_STATUS_KEY}'] = {
            componentWillLoad: { all: 0 },
            componentDidLoad: { all: 0 },
            componentWillUpdate: { all: 0 },
            componentDidUpdate: { all: 0 }
          };

          const hooks = ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'];
          for (let hook of hooks) {
            window.addEventListener(\`stencil_\${hook}\`, (e) => {
              const eventName = e.type.replace('stencil_', '');
              const tagName = e.composedPath()[0].tagName.toLowerCase();

              if (window['${LIFECYCLE_STATUS_KEY}'][eventName][tagName] === undefined) {
                // to ensure the lifecycle hook is not undefined in our e2e test, we have to initialize it
                for (const hook of hooks) {
                  window['${LIFECYCLE_STATUS_KEY}'][hook][tagName] = 0;
                }
              }

              window['${LIFECYCLE_STATUS_KEY}'][eventName][tagName]++;
              window['${LIFECYCLE_STATUS_KEY}'][eventName].all++;

              // Debug helper
              // console.log(JSON.stringify(window['${LIFECYCLE_STATUS_KEY}']));

              ${lifeCycleLogger}
            });
          };

        </script>
        ${content}
      </body>
    </html>`,
    options
  );

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

export const getShadowRoot = async (element: ElementHandle): Promise<ElementHandle<ShadowRoot>> => {
  return (await element.evaluateHandle((el) => el.shadowRoot)).asElement();
};

const containsCapitalChar = (key: string): boolean => /[A-Z]/.test(key);

export const getAttribute = (element: ElementHandle, attribute: string): Promise<string> => {
  return element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
};

export const setAttribute = async (element: ElementHandle, key: string, value: string): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`setAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await element.evaluate((el, { key, value }) => el.setAttribute(key, value), { key, value });
};

export const removeAttribute = async (element: ElementHandle, key: string): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`removeAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await element.evaluate((el, key) => el.removeAttribute(key), key);
};

export const getProperty = async <T>(element: ElementHandle, prop: string): Promise<T> => {
  return element.evaluate((el, prop: string) => el[prop], prop);
};

export const setProperty = async <T>(
  element: ElementHandle,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value } as any);
};

export const getCssClasses = async (element: ElementHandle): Promise<string> => {
  return Object.values(await getProperty(element, 'classList')).join(' ');
};

export const getActiveElementTagNameInShadowRoot = (element: ElementHandle): Promise<string> => {
  return element.evaluate((el) => el.shadowRoot.activeElement.tagName);
};

export const getActiveElementClassNameInShadowRoot = (element: ElementHandle): Promise<string> => {
  return element.evaluate((el) => el.shadowRoot.activeElement.className);
};

export const getActiveElementId = (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.id);
};

export const getActiveElementTagName = (page: Page): Promise<string> => {
  return page.evaluate(() => document.activeElement.tagName);
};

type Pseudo = '::before' | '::after' | '::-webkit-search-decoration';
type GetElementStyleOptions = {
  waitForTransition?: boolean;
  pseudo?: Pseudo;
};

export const getElementStyle = (
  element: ElementHandle,
  property: keyof CSSStyleDeclaration,
  opts?: GetElementStyleOptions
): Promise<string> => {
  return element.evaluate(
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

export const getElementIndex = (element: ElementHandle, selector: string): Promise<number> => {
  return element.evaluate(async (el, selector: string): Promise<number> => {
    let option: ChildNode = el.querySelector(selector);
    let pos = 0;
    while (option && (option = option.previousSibling) !== null) {
      pos++;
    }
    return pos;
  }, selector);
};

export const getElementInnerText = (element: ElementHandle): Promise<string> =>
  element.evaluate((el) => (el as HTMLElement).innerText);

export const getElementPositions = (
  page: Page,
  element: ElementHandle
): Promise<{ top: number; left: number; bottom: number; right: number }> => {
  return page.evaluate((element) => {
    const { top, left, bottom, right } = element.getBoundingClientRect();
    return { top, left, bottom, right };
  }, element);
};

export const reattachElementHandle = (handle: ElementHandle): Promise<void> => {
  return handle.evaluate((el) => {
    el.remove();
    document.body.appendChild(el);
  });
};

export const enableBrowserLogging = (page: Page): void => {
  page.on('console', (msg) => {
    console.log(msg.type() + ':', msg.text());
  });
};

export const waitForInputTransition = (page: Page): Promise<void> => page.waitForTimeout(250);

export const hasFocus = (element: ElementHandle): Promise<boolean> =>
  element.evaluate((el) => document.activeElement === el);

const consoleMessages: ConsoleMessage[] = [];

// Use to track console errors, excluding custom thrown errors
export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset

  page.on('console', (msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      const { description } = msg.args()[0]['_remoteObject'];
      if (description) {
        console.log(description);
      }
    }
  });
};

const getConsoleErrors = () => consoleMessages.filter((x) => x.type() === 'error');
const getConsoleWarnings = () => consoleMessages.filter((x) => x.type() === 'warning');
export const getConsoleErrorsAmount = () => getConsoleErrors().length;
export const getConsoleErrorMessages = () =>
  getConsoleErrors()
    .map((msg) => '- ' + msg.text())
    .join('\n');
export const getConsoleWarningsAmount = () => getConsoleWarnings().length;
export const getConsoleWarningMessages = () =>
  getConsoleWarnings()
    .map((msg) => '- ' + msg.text())
    .join('\n');

const thrownErrors: string[] = [];

// Use to track custom thrown errors
export const initPageErrorObserver = (page: Page): void => {
  thrownErrors.length = 0; // reset

  page.on('pageerror', function (error) {
    thrownErrors.push(error.toString());
  });
};

export const getPageThrownErrorsAmount = () => thrownErrors.length;

const BASE_URL = 'http://localhost:8575';

export const goto = async (page: Page, url: string) => {
  await page.goto(`${BASE_URL}/#${url}`);
  await waitForComponentsReady(page);
};

export const buildDefaultComponentMarkup = (tagName: TagName): string => {
  const componentMeta = getComponentMeta(tagName);

  const buildChildMarkup = (requiredChild: string): string => {
    if (requiredChild) {
      return requiredChild.startsWith('input') ? `<${requiredChild} />` : `<${requiredChild}></${requiredChild}>`;
    } else {
      return 'Some child';
    }
  };

  const buildParentMarkup = (markup: string, { requiredParent }: ComponentMeta): string => {
    if (requiredParent) {
      const markupWithParent = `<${requiredParent}>${markup}</${requiredParent}>`;
      return buildParentMarkup(markupWithParent, getComponentMeta(requiredParent));
    } else {
      return markup;
    }
  };

  const attributes = componentMeta.requiredProps?.map((prop) => ` ${prop}="value"`).join() || '';

  const componentMarkup = `<${tagName}${attributes}>${buildChildMarkup(componentMeta.requiredChild)}</${tagName}>`;

  return buildParentMarkup(componentMarkup, componentMeta);
};

export const expectShadowDomToMatchSnapshot = async (host: ElementHandle): Promise<void> => {
  const html = await host.evaluate((el) => el.shadowRoot.innerHTML);
  const prettyHtml = beautify.html(html.replace(/>/g, '>\n'), {
    indent_inner_html: true,
    indent_size: 2,
  });

  expect(prettyHtml).not.toContain('[object Object]');
  expect(prettyHtml).toMatchSnapshot();
};

type ExpectToMatchSnapshotOptions = Omit<SnapshotOptions, 'root'> & {
  message?: string;
};
export const expectA11yToMatchSnapshot = async (
  page: Page,
  elementHandle: ElementHandle,
  opts?: ExpectToMatchSnapshotOptions
): Promise<void> => {
  const { message, ...options } = opts || {};
  const snapshot = await page.accessibility.snapshot({
    root: elementHandle,
    ...options,
  });

  message ? expect(snapshot).toMatchSnapshot(message) : expect(snapshot).toMatchSnapshot();
};

export const expectToSkipFocusOnComponent = async (page: Page, component: ElementHandle, before: ElementHandle) => {
  await before.focus();

  await page.keyboard.press('Tab');

  expect(await getActiveElementId(page)).toBe('after');

  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');

  expect(await getActiveElementId(page)).toBe('before');
};

export const getScrollLeft = (element: ElementHandle): Promise<number> => getProperty<number>(element, 'scrollLeft');
export const getOffsetLeft = (element: ElementHandle): Promise<number> => getProperty<number>(element, 'offsetLeft');
export const getOffsetWidth = (element: ElementHandle): Promise<number> => getProperty<number>(element, 'offsetWidth');
