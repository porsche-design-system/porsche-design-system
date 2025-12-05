import { type ConsoleMessage, expect, type Locator, Page } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { waitForComponentsReady } from './stencil';

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
type Options = any & {
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

const containsCapitalChar = (key: string): boolean => /[A-Z]/.test(key);

export const getAttribute = (locator: Locator, attribute: string): Promise<string> => {
  return locator.evaluate((el, attr: string) => el.getAttribute(attr), attribute);
};

export const setAttribute = async (locator: Locator, key: string, value: string): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`setAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await locator.evaluate((el, { key, value }) => el.setAttribute(key, value), { key, value });
};

export const removeAttribute = async (element: Locator, key: string): Promise<void> => {
  if (containsCapitalChar(key)) {
    console.warn(`removeAttribute: '${key}' contains a capital character which is most likely wrong`);
  }
  await element.evaluate((el, key) => el.removeAttribute(key), key);
};

export const getProperty = async <T>(locator: Locator, prop: string): Promise<T> => {
  return locator.evaluate((el, prop: string) => el[prop], prop);
};

export const setProperty = async <T>(
  element: Locator,
  key: string,
  value: string | boolean | number | T
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value } as any);
};

export const getActiveElementTagNameInShadowRoot = async (element: Locator): Promise<string> => {
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

export const getActiveElementId = (page: Page): Promise<string> => {
  return page.evaluate(() => {
    try {
      return document.activeElement.id;
    } catch (e) {
      throw new Error(`Could not get "id" from document.activeElement (${document.activeElement}) `);
    }
  });
};

type Pseudo = '::before' | '::after' | '::-webkit-search-decoration';
type GetElementStyleOptions = {
  waitForTransition?: boolean;
  pseudo?: Pseudo;
};

export const getElementStyle = (
  element: Locator,
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

export const enableBrowserLogging = (page: Page): void => {
  page.on('console', (msg) => {
    console.log(msg.type() + ':', msg.text());
  });
};

const consoleMessages: ConsoleMessage[] = [];

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

  const buildParentMarkup = (markup: string, requiredParent: TagName): string => {
    if (requiredParent) {
      const markupWithParent = `<${requiredParent}>${markup}</${requiredParent}>`;
      return buildParentMarkup(markupWithParent, getComponentMeta(requiredParent).requiredParent);
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

export type ExpectToMatchSnapshotOptions = Omit<any, 'root'> & {
  message?: string;
  skipWaitForFunction?: boolean;
};

export const getScrollLeft = (locator: Locator): Promise<number> => getProperty<number>(locator, 'scrollLeft');
export const getOffsetLeft = (locator: Locator): Promise<number> => getProperty<number>(locator, 'offsetLeft');
export const getOffsetWidth = (locator: Locator): Promise<number> => getProperty<number>(locator, 'offsetWidth');

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
