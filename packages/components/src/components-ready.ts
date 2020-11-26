/* eslint-disable no-console */

let hasRegisteredEventListeners = false;
let taskCount = 0;
let timeout: number;
let resolvePromise: () => void;

const createPromise = (): Promise<void> => {
  console.log('createPromise');
  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

let onLoadedPromise = createPromise();

const checkPromiseResolve = (): void => {
  if (taskCount === 0) {
    console.log('checkPromiseResolve');
    // we debounce 30ms, because the loader is doing the
    // same for the "hydrated" class: https://github.com/ionic-team/stencil/blob/master/src/runtime/bootstrap-lazy.ts#L169
    timeout = window.setTimeout(() => {
      resolvePromise();
      console.log('––> resolvedPromise');
      onLoadedPromise = createPromise();
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
  registerStencilEventListeners();
  checkPromiseResolve();
  return onLoadedPromise;
};

// ------------------

const waitFrame = (): Promise<number> =>
  new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

const allReady = (): Promise<any[] | void> => {
  console.log('allReady?');
  const promises: Promise<any>[] = [];
  const waitForDidLoad = (elm: Element): void => {
    if (elm != null && elm.nodeType === 1) {
      for (let i = 0; i < elm.children.length; i++) {
        console.log('allReady loop', i);
        const childElm = elm.children[i];
        if (childElm.tagName.includes('P-') && typeof (childElm as any).componentOnReady === 'function') {
          promises.push((childElm as any).componentOnReady());
          console.log('added promise');
        }
        waitForDidLoad(childElm);
      }
    }
  };

  // waitForDidLoad(promises, window.document.documentElement);
  waitForDidLoad(document.getElementById('app'));

  return Promise.all(promises).catch((e) => console.error(e));
};

let hasStencilLoaded: Promise<void>;
const stencilLoaded = (): Promise<void> => {
  console.log('stencilLoaded?');
  hasStencilLoaded = allReady()
    .then(waitFrame)
    .then(allReady)
    .then(() => {
      console.log('stencilLoaded /// setting stencilAppLoaded = true');
      (window as any).stencilAppLoaded = true;
    });

  window.addEventListener('appload', (e) => {
    console.log(e.type, taskCount);
    stencilReady();
  });

  return hasStencilLoaded;
};

const stencilReady = (): Promise<void> => {
  console.log('stencilReady?');
  return hasStencilLoaded.then(allReady).then(() => {
    console.log('––> stencilReady');
  });
};

const registerStencilEventListeners = (): void => {
  if (!hasRegisteredEventListeners) {
    ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
      const handler = event.includes('Will') ? increaseCount : decreaseCount;
      window.addEventListener(
        `stencil_${event}`,
        // for production
        // handler
        // for debugging
        (e) => {
          handler();
          console.log((e.composedPath()[0] as any).tagName.toLowerCase(), e.type, taskCount);
        }
      );
    });

    console.log('document.readyState', document.readyState);
    if (document.readyState === 'complete') {
      stencilLoaded();
    } else {
      document.addEventListener('readystatechange', (e) => {
        console.log('––> readystatechange', document.readyState);
        if ((e.target as Document).readyState === 'complete') {
          stencilLoaded();
        }
      });
    }

    hasRegisteredEventListeners = true;
  }
};
