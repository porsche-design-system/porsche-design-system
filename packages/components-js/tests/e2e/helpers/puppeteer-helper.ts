import { CDPSession, ElementHandle, NavigationOptions, Page } from 'puppeteer';
import { waitForComponentsReady } from './stencil';
import Protocol from 'devtools-protocol';

type Options = NavigationOptions & { enableLogging?: boolean; injectIntoHead?: string };
const defaultOptions: Options = { waitUntil: 'networkidle0', injectIntoHead: '' };

export const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';
export const CSS_ANIMATION_DURATION = 1000;

export const FORCED_PSEUDO_CLASSES = ['focus', 'focus-visible', 'hover'] as const;
export type ForcedPseudoClasses = typeof FORCED_PSEUDO_CLASSES[number];

export const HOVERED_STATE: ForcedPseudoClasses[] = ['hover'];
export const FOCUSED_STATE: ForcedPseudoClasses[] = ['focus', 'focus-visible'];
export const FOCUSED_HOVERED_STATE = HOVERED_STATE.concat(FOCUSED_STATE);

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options): Promise<void> => {
  const options: Options = { ...defaultOptions, ...opts };

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
  ).asElement();
};

export const findBackendNodeId = (currentNode: Protocol.DOM.Node, selector: string): number => {
  if (currentNode.localName === selector) {
    return currentNode.backendNodeId;
  } else {
    for (let i = 0; i < currentNode.children?.length; i++) {
      const currentChild = currentNode.children[i];
      const result = findBackendNodeId(currentChild, selector);
      if (result) {
        return result;
      }
    }
    return undefined;
  }
};

export const forceStateOnElement = async (
  page: Page,
  hostElementSelector: string,
  states: ForcedPseudoClasses[],
  shadowRootSelector?: string
): Promise<void> => {
  const cdp = await page.target().createCDPSession();
  const nodeId = await getHostElementNodeId(cdp, hostElementSelector);
  await forceStateOnNodeId(
    cdp,
    shadowRootSelector ? await getElementNodeIdInShadowRoot(cdp, nodeId, shadowRootSelector) : nodeId,
    states
  );
};

const getElementNodeIdInShadowRoot = async (cdp: CDPSession, nodeId: number, selector: string): Promise<number> => {
  const hostNode: Protocol.DOM.Node = (
    (await cdp.send('DOM.describeNode', {
      nodeId,
      depth: -1,
      pierce: true,
    })) as Protocol.DOM.DescribeNodeResponse
  ).node;

  const backendNodeId = findBackendNodeId(hostNode.shadowRoots[0], selector);

  return (
    (await cdp.send('DOM.pushNodesByBackendIdsToFrontend', {
      backendNodeIds: [backendNodeId],
    })) as Protocol.DOM.PushNodesByBackendIdsToFrontendResponse
  ).nodeIds[0];
};

const getHostElementNodeId = async (cdp: CDPSession, selector: string): Promise<number> => {
  await cdp.send('DOM.getDocument');
  const { root } = (await cdp.send('DOM.getDocument', {
    depth: -1,
    pierce: true,
  })) as Protocol.DOM.GetDocumentResponse;

  return (
    (await cdp.send('DOM.querySelector', {
      nodeId: root.nodeId,
      selector,
    })) as Protocol.DOM.QuerySelectorResponse
  ).nodeId;
};

const forceStateOnNodeId = async (
  cdp: CDPSession,
  nodeId: number,
  forcedPseudoClasses: ForcedPseudoClasses[]
): Promise<void> => {
  await cdp.send('CSS.enable'); // @ts-ignore
  await cdp.send('CSS.forcePseudoState', {
    nodeId,
    forcedPseudoClasses,
  });
};

const containsCapitalChar = (key: string): boolean => /[A-Z]/.test(key);

export const getAttribute = async (element: ElementHandle, attribute: string): Promise<string> => {
  return await element.evaluate((el: HTMLElement, attr: string) => el.getAttribute(attr), attribute);
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

export const getProperty = async (element: ElementHandle, prop: string): Promise<unknown> => {
  return element.evaluate((el, prop: string) => el[prop], prop);
};

export const setProperty = async (
  element: ElementHandle,
  key: string,
  value: string | boolean | number
): Promise<void> => {
  await element.evaluate((el, { key, value }) => (el[key] = value), { key, value });
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

type Pseudo = '::before' | '::after' | '::-webkit-search-decoration';
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

export const enableBrowserLogging = (page: Page) => {
  page.on('console', (msg) => {
    console.log(msg.type() + ':', msg.text());
  });
};

export const waitForInputTransition = (page: Page) => page.waitForTimeout(250);

export const hasFocus = (page: Page, element: ElementHandle): Promise<boolean> =>
  page.evaluate((el) => document.activeElement === el, element);
