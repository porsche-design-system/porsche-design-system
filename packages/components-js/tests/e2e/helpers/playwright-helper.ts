import type { ConsoleMessage, ElementHandle, Page } from 'playwright';
import { expect, type Locator } from '@playwright/test';
import { waitForComponentsReady } from './stencil';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { format } from 'prettier';
import { getInitialStyles } from '@porsche-design-system/components-js/partials';

// TODO: temporary workaround, because of https://github.com/microsoft/playwright/issues/17075
// import { kebabCase } from 'change-case';
const kebabCase = (str: string): string => {
  return str.replace(/-(\w)/g, (_, group) => group.toUpperCase());
};

export type ClickableTests = {
  state: string;
  setContent: (page: Page) => Promise<void>;
}[];

// TODO: fix typing
export type Options = any & {
  enableLogging?: boolean;
  injectIntoHead?: string;
  withoutLoadCall?: boolean;
  withoutWaitForComponentsReady?: boolean;
};

export const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options): Promise<void> => {
  const options: Options = {
    waitUntil: 'networkidle0',
    injectIntoHead: '',
    withoutLoadCall: false,
    withoutWaitForComponentsReady: false,
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
        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.css">
        <link rel="stylesheet" href="assets/styles.css">
        ${getInitialStyles()}
        ${options.injectIntoHead}
      </head>
      <body>
        ${options.withoutLoadCall ? '' : '<script type="text/javascript">porscheDesignSystem.load();</script>'}
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
              }, 40); // TODO: reduce or better remove this timeout for a reliable waitForStencilLifecycle() utility
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

  if (!options.withoutWaitForComponentsReady) {
    await waitForComponentsReady(page);
  }
};

export const getShadowRoot = async (
  element: ElementHandle<HTMLElement | SVGElement>
): Promise<ElementHandle<ShadowRoot>> => {
  return (await element.evaluateHandle((el) => el.shadowRoot)).asElement();
};

const containsCapitalChar = (key: string): boolean => /[A-Z]/.test(key);

export const getAttribute = (element: ElementHandle<HTMLElement | SVGElement>, attribute: string): Promise<string> => {
  return element.evaluate((el, attr: string) => el.getAttribute(attr), attribute);
};

export const setAttribute = async (
  element: ElementHandle<HTMLElement | SVGElement>,
  key: string,
  value: string
): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`setAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await element.evaluate((el, { key, value }) => el.setAttribute(key, value), { key, value });
};

export const removeAttribute = async (element: ElementHandle<HTMLElement | SVGElement>, key: string): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`removeAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await element.evaluate((el, key) => el.removeAttribute(key), key);
};

export const getProperty = async <T>(element: ElementHandle<T> | Locator, prop: string): Promise<keyof T> => {
  return element.evaluate((el, prop: string) => el[prop], prop);
};

export const setProperty = async <T>(
  element: ElementHandle<HTMLElement | SVGElement>,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value } as any);
};

export const getCssClasses = async (element: ElementHandle<HTMLElement | SVGElement>): Promise<string> => {
  return Object.values(await getProperty(element, 'classList')).join(' ');
};

export const getActiveElementTagNameInShadowRoot = async (
  element: ElementHandle<HTMLElement | SVGElement>
): Promise<string> => {
  return element.evaluate((el) => {
    try {
      return el.shadowRoot.activeElement.tagName;
    } catch (e) {
      throw new Error(
        `Could not get "tagName" from ${el.tagName}.shadowRoot.activeElement (${el.shadowRoot.activeElement}) `
      );
    }
  });
};

export const getActiveElementClassNameInShadowRoot = (
  element: ElementHandle<HTMLElement | SVGElement>
): Promise<string> => {
  return element.evaluate((el) => {
    try {
      return el.shadowRoot.activeElement.className;
    } catch (e) {
      throw new Error(
        `Could not get "className" from ${el.tagName}.shadowRoot.activeElement (${el.shadowRoot.activeElement}) `
      );
    }
  });
};

export const getActiveElementId = (page: Page): Promise<string> => {
  return page.evaluate(() => {
    try {
      return document.activeElement.id;
    } catch (e) {
      throw new Error(`Could not get "id" from document.activeElement (${document.activeElement}) `);
    }
  });
};

export const getActiveElementTagName = (page: Page): Promise<string> => {
  return page.evaluate(() => {
    try {
      return document.activeElement.tagName;
    } catch (e) {
      throw new Error(`Could not get "tagName" from document.activeElement (${document.activeElement}) `);
    }
  });
};

export const getActiveElementProp = (page: Page, prop: string): Promise<string> => {
  return page.evaluate((prop) => {
    try {
      return document.activeElement[prop];
    } catch (e) {
      throw new Error(`Could not get "${prop}" from document.activeElement (${document.activeElement}) `);
    }
  }, prop);
};

type Pseudo = '::before' | '::after' | '::-webkit-search-decoration';
type GetElementStyleOptions = {
  waitForTransition?: boolean;
  pseudo?: Pseudo;
};

export const getElementStyle = (
  element: ElementHandle<HTMLElement | SVGElement>,
  property: keyof CSSStyleDeclaration,
  opts?: GetElementStyleOptions
): Promise<string> => {
  return element.evaluate(
    async (el, { property, opts }): Promise<string> => {
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
    { property, opts }
  );
};

export const getElementIndex = (
  element: ElementHandle<HTMLElement | SVGElement | ShadowRoot>,
  selector: string
): Promise<number> => {
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

export const getElementPositions = (page: Page, element: ElementHandle<HTMLElement | SVGElement>): Promise<DOMRect> =>
  page.evaluate((element) => element.getBoundingClientRect(), element);

export const reattachElementHandle = (handle: ElementHandle<HTMLElement | SVGElement>): Promise<void> => {
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

export const waitForInputTransition = (page: Page): Promise<void> => new Promise((resolve) => setTimeout(resolve, 250));

export const hasFocus = (element: ElementHandle<HTMLElement | SVGElement>): Promise<boolean> =>
  element.evaluate((el) => document.activeElement === el);

const consoleMessages: ConsoleMessage[] = [];

// Use to track console errors, excluding custom thrown errors
export const initConsoleObserver = (page: Page): void => {
  consoleMessages.length = 0; // reset
  page.on('console', async (msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error') {
      console.error(msg.text());
    }
  });
};

const getConsoleErrors = () => consoleMessages.filter((x) => x.type() === 'error');
export const getConsoleWarnings = () => consoleMessages.filter((x) => x.type() === 'warning');
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
  await page.goto(`${BASE_URL}/${url}`);
  await waitForComponentsReady(page);
};

// TODO: Replace with component provisioning function
export const buildDefaultComponentMarkup = (tagName: TagName): string => {
  const {
    requiredChild,
    requiredParent,
    propsMeta, // new format
    slotsMeta,
  } = getComponentMeta(tagName);

  const buildChildMarkup = (
    requiredChild: string,
    requiredNamedSlots: { slotName: string; tagName: TagName | keyof HTMLElementTagNameMap }[]
  ): string => {
    if (requiredChild) {
      return requiredChild.startsWith('input') ? `<${requiredChild} />` : `<${requiredChild}></${requiredChild}>`;
    } else if (requiredNamedSlots && requiredNamedSlots.length > 0) {
      return requiredNamedSlots
        .map(
          ({ slotName, tagName }) =>
            `<${tagName} slot="${slotName}"${tagName.includes('link') ? ' href="#"' : ''}>Some label</${tagName}>`
        )
        .join('\n');
    } else {
      return 'Some child';
    }
  };

  const buildParentMarkup = (markup: string, requiredParent: TagName | TagName[]): string => {
    const firstRequiredParent = Array.isArray(requiredParent) ? requiredParent[0] : requiredParent;
    if (firstRequiredParent) {
      const markupWithParent = `<${firstRequiredParent}>${markup}</${firstRequiredParent}>`;
      return buildParentMarkup(markupWithParent, getComponentMeta(firstRequiredParent).requiredParent);
    } else {
      return markup;
    }
  };

  // add required attributes that would cause validation to throw
  const attributes = propsMeta
    ? Object.entries(propsMeta)
        .map(
          ([propName, { defaultValue, isRequired }]) =>
            // handling all href attributes to trick throwIfInvalidLinkUsage and throwIfInvalidLinkTileProductUsage
            (isRequired || propName === 'href') && ` ${kebabCase(propName)}="${defaultValue ?? 'value'}"`
        )
        .filter(Boolean)
        .join()
    : '';

  const requiredNamedSlots =
    slotsMeta &&
    Object.entries(slotsMeta)
      .filter(([, value]) => value.isRequired)
      .map(([key, value]) => ({ slotName: key, tagName: value.allowedTagNames[0] }));

  const componentMarkup = `<${tagName}${attributes}>${buildChildMarkup(
    requiredChild,
    requiredNamedSlots
  )}</${tagName}>`;

  return buildParentMarkup(componentMarkup, requiredParent);
};

export const expectShadowDomToMatchSnapshot = async (host: ElementHandle<HTMLElement | SVGElement>): Promise<void> => {
  const html = await host.evaluate((el) => el.shadowRoot.innerHTML);
  const prettyHtml = await format(html.replace(/>/g, '>\n'), { parser: 'html' });

  expect(prettyHtml).not.toContain('[object Object]');
  expect(prettyHtml).toMatchSnapshot();
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

export const getScrollLeft = (element: ElementHandle<HTMLElement | SVGElement>): Promise<number> =>
  getProperty(element, 'scrollLeft') as unknown as Promise<number>;
export const getOffsetLeft = (element: ElementHandle<HTMLElement | SVGElement>): Promise<number> =>
  getProperty(element, 'offsetLeft') as unknown as Promise<number>;
export const getOffsetWidth = (element: ElementHandle<HTMLElement | SVGElement>): Promise<number> =>
  getProperty(element, 'offsetWidth') as unknown as Promise<number>;

/**
 * Get HTML attributes string from an object of properties.
 * @param props - The object containing the properties.
 * @returns The HTML attributes string.
 */
export const getHTMLAttributes = <T extends object>(props: T): string => {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([prop, value]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue = typeof value === 'object' ? JSON.stringify(value).replace(/"/g, "'") : value;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
};

export const getOldLoaderScriptForPrefixes = (prefixes: string[]): string => {
  const loadCalls = prefixes.map((prefix) => `porscheDesignSystem.load(\{ prefix: '${prefix}' \});`).join('\n      ');
  // the script below has been copied from https://designsystem.porsche.com/release/components-v3.7.0/
  return (
    '<script data-pds-loader-script="">var porscheDesignSystem;(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{load:()=>r});const n="porscheDesignSystem";function o(){return document[n]||(document[n]={}),document[n]}function s({script:e,version:t,prefix:s}){const r=function(e){const t=o(),{[e]:n}=t;if(!n){let n=()=>{};const o=new Promise((e=>n=e));t[e]={isInjected:!1,isReady:()=>o,readyResolve:n,prefixes:[],registerCustomElements:null}}return t[e]}(t),{isInjected:i,prefixes:c=[],registerCustomElements:d}=r,[u]=Object.entries(o()).filter((([e,n])=>e!==t&&"object"==typeof n&&n.prefixes.includes(s)));if(u)throw new Error(`[Porsche Design System v${t}] prefix \'${s}\' is already registered with version \'${u[0]}\' of the Porsche Design System. Please use a different one.\\nTake a look at document.${n} for more details.`);i||(function(e){const t=document.createElement("script");t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}(e),r.isInjected=!0),c.includes(s)||(c.push(s),d&&d(s))}const r=(e={})=>{const t="PORSCHE_DESIGN_SYSTEM_CDN";window[t]=e.cdn||window[t]||(window.location.origin.match(/\\.cn$/)?"cn":"auto");const n="porscheDesignSystem";document[n]||(document[n]={}),document[n].cdn={url:"https://cdn.ui.porsche."+("cn"===window[t]?"cn":"com"),prefixes:[]},s({version:"3.7.0",script:document[n].cdn.url+"/porsche-design-system/components/porsche-design-system.v3.7.0.3c3999ee659a976cf191.js",prefix:e.prefix||""})};porscheDesignSystem=t})();' +
    loadCalls +
    '</script>'
  );
};

// Fix Playwright timeout error when clicking element in shadowRoot
// https://github.com/microsoft/playwright/issues/12298
// Error: intercepts pointer events
export const clickElementPosition = async (page: Page, el: ElementHandle<SVGElement | HTMLElement>): Promise<void> => {
  const { x, y, width, height } = await getElementPositions(page, el);
  await page.mouse.click(x + width / 2, y + height / 2);
};

// Fix Playwright timeout error when hovering element in shadowRoot
// https://github.com/microsoft/playwright/issues/12298
// Error: intercepts pointer events
export const hoverElementPosition = async (page: Page, el: ElementHandle<SVGElement | HTMLElement>): Promise<void> => {
  const { x, y, width, height } = await getElementPositions(page, el);
  await page.mouse.move(x + width / 2, y + height / 2);
};
