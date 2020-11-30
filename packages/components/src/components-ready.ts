/* eslint-disable no-console */

import { HostElement } from '@stencil/core/internal';

let isInitialized = false;
let taskCount = 0;
let timeout: number;
let promiseResolve: () => void;

const checkPromiseResolve = (): void => {
  console.log('checkPromiseResolve');
  if (taskCount === 0) {
    // we debounce 30ms, because the loader is doing the
    // same for the "hydrated" class: https://github.com/ionic-team/stencil/blob/master/src/runtime/bootstrap-lazy.ts#L169
    timeout = window.setTimeout(() => {
      promiseResolve();
      console.log('––> resolvedPromise');
    }, 30);
  }
};

const increaseCount = (): void => {
  taskCount++;
  if (timeout) {
    window.clearTimeout(timeout);
  }
};

const decreaseCount = (): void => {
  taskCount--;
  checkPromiseResolve();
};

export const componentsReady = (): Promise<void> => {
  console.log('componentsReady');
  initialize();
  const prom = new Promise<void>((resolve) => {
    promiseResolve = resolve;
  });
  return prom;
};

// ------------------

const waitFrame = (): any => requestAnimationFrame;

const promises: Promise<any>[] = [];
const waitForDidLoad = (elm: Element): void => {
  // Node.ELEMENT_NODE: An Element node like <p> or <div>
  if (elm?.nodeType === 1) {
    (Array.from(elm.children) as HostElement[]).forEach((childElm) => {
      if (childElm.tagName.includes('P-') && typeof childElm.componentOnReady === 'function') {
        promises.push(childElm.componentOnReady());
      }
      waitForDidLoad(childElm);
    });
  }
};

const allReady = async (): Promise<void> => {
  console.log('allReady?', promises.length);

  // TODO: add ability to pass any element to reduce recursive search radius
  waitForDidLoad(document.getElementById('app'));

  await Promise.all(promises).catch(console.error);
  console.log('––> allReady', promises.length);

  promises.length = 0; // clear array of promises
};

const stencilLoaded = async (): Promise<void> => {
  console.log('stencilLoaded?');
  await allReady(); // needed at least for jsdom-polyfill?
  await waitFrame();
  await allReady();
  // (window as any).porscheDesignSystem.hasLoaded = true;

  registerStencilEventListeners();

  console.log('––> stencilLoaded');
  checkPromiseResolve();
};

const registerStencilEventListeners = (): void => {
  // register listeners for stencil's lifecycleDOMEvents
  ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
    window.addEventListener(`stencil_${event}`, (e: CustomEvent) => {
      if (isEventInStencilNamespace(e)) {
        const handler = event.includes('Will') ? increaseCount : decreaseCount;
        console.log((e.composedPath()[0] as any).tagName.toLowerCase(), e.type, taskCount);
        handler();
      }
    });
  });
};

const initialize = (): void => {
  if (!isInitialized) {
    if (!checkDocumentReadyStateAndStencilLoaded()) {
      // if document isn't ready yet, we register readystatechange event listener
      const eventName = 'readystatechange';
      const eventHandler = (): void => {
        if (checkDocumentReadyStateAndStencilLoaded()) {
          document.removeEventListener(eventName, eventHandler);
        }
      };
      document.addEventListener(eventName, eventHandler);
    }

    isInitialized = true;
  }
};

const isEventInStencilNamespace = (e: CustomEvent): boolean => e.detail.namespace === 'porsche-design-system';

const checkDocumentReadyStateAndStencilLoaded = (): boolean => {
  console.log('document.readyState', document.readyState);
  if (document.readyState === 'complete') {
    stencilLoaded();
    return true;
  }
};
