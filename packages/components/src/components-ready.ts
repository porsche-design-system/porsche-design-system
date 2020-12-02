import { HostElement } from '@stencil/core/internal';

let promiseResolve: () => void;

export const componentsReady = (el: HTMLElement = document.body): Promise<void> => {
  if (!checkDocumentReadyStateAndStencilLoaded(el)) {
    // if document isn't ready yet, we register readystatechange event listener
    const eventName = 'readystatechange';
    const eventHandler = (): void => {
      if (checkDocumentReadyStateAndStencilLoaded(el)) {
        document.removeEventListener(eventName, eventHandler);
      }
    };
    document.addEventListener(eventName, eventHandler);
  }

  return new Promise<void>((resolve) => {
    promiseResolve = resolve;
  });
};

const waitFrame = (): any => requestAnimationFrame;

const readyPromises: Promise<HostElement>[] = [];
const waitForDidLoad = (el: HTMLElement): void => {
  // Node.ELEMENT_NODE: An Element node like <p> or <div>
  if (el?.nodeType === 1) {
    (Array.from(el.children) as HostElement[]).forEach((childEl) => {
      if (isDesignSystemElement(childEl)) {
        readyPromises.push(childEl.componentOnReady());
      }
      waitForDidLoad(childEl);
    });
  }
};

const regex = new RegExp(/^(.*-)?P-(.*)$/);
const isDesignSystemElement = (el: HostElement): boolean =>
  regex.exec(el.tagName) && typeof el.componentOnReady === 'function';

const allReady = async (el: HTMLElement): Promise<void> => {
  waitForDidLoad(el);
  await Promise.all(readyPromises).catch(console.error);

  readyPromises.length = 0; // clear array of promises for next round
};

const stencilLoaded = async (el: HTMLElement): Promise<void> => {
  await waitFrame();
  await allReady(el);
  // (window as any).porscheDesignSystem.hasLoaded = true;

  promiseResolve();
};

const checkDocumentReadyStateAndStencilLoaded = (el: HTMLElement): boolean => {
  if (document.readyState === 'complete') {
    stencilLoaded(el);
    return true;
  }
};
