import { HostElement } from '@stencil/core/internal';

type PromiseResolve = (amount: number) => void;

export const componentsReady = (el: HTMLElement = document.body): Promise<number> => {
  let promiseResolve: PromiseResolve;
  const promise = new Promise((resolve: PromiseResolve) => (promiseResolve = resolve));

  if (!isDocumentReady()) {
    // if document isn't ready yet, we register readystatechange event listener
    const eventName = 'readystatechange';
    const eventHandler = (): void => {
      if (isDocumentReady()) {
        document.removeEventListener(eventName, eventHandler);
        allComponentsLoaded(el, promiseResolve);
      }
    };
    document.addEventListener(eventName, eventHandler);
  } else {
    allComponentsLoaded(el, promiseResolve);
  }

  return promise;
};

const isDocumentReady = (): boolean => document.readyState === 'complete';

const allComponentsLoaded = (el: HTMLElement, resolve: PromiseResolve): void => {
  document.porscheDesignSystem[ROLLUP_REPLACE_VERSION].isReady().then(() => {
    const readyPromises = collectAllComponentOnReadyPromises(el);
    Promise.all(readyPromises)
      .then((proms) => resolve(proms.length))
      .catch(console.error);
  });
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
