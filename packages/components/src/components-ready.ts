import { HostElement } from '@stencil/core/internal';

const readyPromises: Promise<HostElement>[] = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let promiseResolve: (amount: number) => void;

export const componentsReady = (el: HTMLElement = document.body): Promise<number> => {
  if (!isDocumentReady()) {
    // if document isn't ready yet, we register readystatechange event listener
    const eventName = 'readystatechange';
    const eventHandler = (): void => {
      if (isDocumentReady()) {
        document.removeEventListener(eventName, eventHandler);
        allComponentsLoaded(el);
      }
    };
    document.addEventListener(eventName, eventHandler);
  } else {
    allComponentsLoaded(el);
  }

  return new Promise((resolve) => (promiseResolve = resolve));
};

const isDocumentReady = (): boolean => document.readyState === 'complete';

const allComponentsLoaded = async (el: HTMLElement): Promise<void> => {
  collectAllComponentOnReadyPromises(el);
  await Promise.all(readyPromises).catch(console.error);

  promiseResolve(readyPromises.length);
  readyPromises.length = 0; // clear array of promises for next round
};

const collectAllComponentOnReadyPromises = (el: HTMLElement): void => {
  // Node.ELEMENT_NODE: An Element node like <p> or <div>
  if (el?.nodeType === 1) {
    (Array.from(el.children) as HostElement[]).forEach((childEl) => {
      if (isDesignSystemElement(childEl)) {
        readyPromises.push(childEl.componentOnReady());
      }
      collectAllComponentOnReadyPromises(childEl);
    });
  }
};

const regex = new RegExp(/^(.*-)?P-(.*)$/);
const isDesignSystemElement = (el: HostElement): boolean => {
  return regex.exec(el.tagName) && typeof el.componentOnReady === 'function';
};
