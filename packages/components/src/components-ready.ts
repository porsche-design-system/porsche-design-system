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

const waitFrame = () =>
  new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

const allReady = () => {
  console.log('allReady');
  const promises: Promise<any>[] = [];
  const waitForDidLoad = (promises: Promise<any>[], elm: Element) => {
    if (elm != null && elm.nodeType === 1) {
      for (let i = 0; i < elm.children.length; i++) {
        console.log('allReady loop', i);
        const childElm = elm.children[i];
        if (childElm.tagName.includes('P-') && typeof (childElm as any).componentOnReady === 'function') {
          promises.push((childElm as any).componentOnReady());
          console.log('added promise');
        }
        waitForDidLoad(promises, childElm);
      }
    }
  };

  // waitForDidLoad(promises, window.document.documentElement);
  waitForDidLoad(promises, document.getElementById('app'));

  return Promise.all(promises).catch((e) => console.error(e));
};

const stencilReady = () => {
  console.log('stencilReady');
  return allReady()
    .then(waitFrame)
    .then(allReady)
    .then(() => {
      console.log('setting stencilAppLoaded = true');
      (window as any).stencilAppLoaded = true;
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

    window.addEventListener('appload', (e) => {
      console.log(e.type, taskCount);
    });

    console.log('document.readyState', document.readyState);
    if (document.readyState === 'complete') {
      stencilReady();
    } else {
      document.addEventListener('readystatechange', function(e) {
        console.log('––> readystatechange', document.readyState);
        if ((e.target as Document).readyState == 'complete') {
          stencilReady();
        }
      });
    }

    hasRegisteredEventListeners = true;
  }
};

export const componentsReady = (): Promise<void> => {
  console.log('componentsReady');
  registerStencilEventListeners();
  checkPromiseResolve();
  return onLoadedPromise;
};
