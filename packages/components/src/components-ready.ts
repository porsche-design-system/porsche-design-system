import type { HostElement } from '@stencil/core/internal';

type PromiseResolve = (amount: number) => void;

export const componentsReady = (el: HTMLElement = document.body): Promise<number> => {
  let promiseResolve: PromiseResolve;
  const promise: Promise<number> = new Promise((resolve) => (promiseResolve = resolve));

  const waitForDesignSystemAndComponents = (): void => {
    isDesignSystemReady().then(() => allComponentsLoaded(el, promiseResolve));
  };

  if (isDocumentReady()) {
    waitForDesignSystemAndComponents();
  } else {
    // if document isn't ready yet, we register readystatechange event listener
    const eventName = 'readystatechange';
    const eventHandler = (): void => {
      if (isDocumentReady()) {
        document.removeEventListener(eventName, eventHandler);
        waitForDesignSystemAndComponents();
      }
    };
    document.addEventListener(eventName, eventHandler);
  }

  return promise;
};

const isDocumentReady = (): boolean => document.readyState === 'complete';

const isDesignSystemReady = (): Promise<void> => {
  if (document.porscheDesignSystem?.[ROLLUP_REPLACE_VERSION]?.isReady) {
    return document.porscheDesignSystem[ROLLUP_REPLACE_VERSION].isReady();
  } else {
    // we are to early and the design system isn't initialized, yet
    // so we create a proxy to detect when the relevant version is set on document.porscheDesignSystem
    // and then wait for its isReady() promise to resolve
    // this can happen in tests
    let promiseResolve: () => void;
    const promise: Promise<void> = new Promise((resolve) => (promiseResolve = resolve));

    const proxyHandler = {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      set(_, prop, value: { isReady: () => Promise<void> }) {
        if (prop === ROLLUP_REPLACE_VERSION) {
          value.isReady().then(promiseResolve);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Reflect.set(...arguments); // eslint-disable-line prefer-rest-params
      },
    };

    document.porscheDesignSystem = new Proxy(document.porscheDesignSystem || {}, proxyHandler);

    return promise;
  }
};

const allComponentsLoaded = (el: HTMLElement, resolve: PromiseResolve): void => {
  const readyPromises = collectAllComponentOnReadyPromises(el);
  Promise.all(readyPromises)
    .then((proms) => resolve(proms.length))
    .catch((err) => console.error('[Porsche Design System]', err)); // eslint-disable-line no-console
};

const collectAllComponentOnReadyPromises = (el: HTMLElement): Promise<HostElement>[] => {
  let readyPromises: Promise<HostElement>[] = [];

  // Node.ELEMENT_NODE: An Element node like <p> or <div>
  if (el?.nodeType === 1) {
    (Array.from(el.children) as HostElement[]).forEach((childEl) => {
      if (isDesignSystemElement(childEl)) {
        readyPromises.push(childEl.componentOnReady());
      }
      readyPromises = readyPromises.concat(collectAllComponentOnReadyPromises(childEl));
    });
  }

  return readyPromises;
};

const regex = /^(.*-)?P-(.*)$/;
const isDesignSystemElement = (el: HostElement): boolean => {
  return regex.exec(el.tagName) && typeof el.componentOnReady === 'function';
};
