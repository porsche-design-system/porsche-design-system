import type { HostElement } from '@stencil/core/internal';
import type { PorscheDesignSystem } from './types';

type PromiseResolve = (amount: number) => void;

export const componentsReady = (
  el: HTMLElement = document.body,
  readyState: DocumentReadyState = 'interactive'
): Promise<number> => {
  let promiseResolve: PromiseResolve;
  const promise: Promise<number> = new Promise((resolve) => (promiseResolve = resolve));

  const waitForDesignSystemAndComponents = (): void => {
    isDesignSystemReady().then(() => allComponentsLoaded(el, promiseResolve));
  };

  if (isDocumentReady(readyState)) {
    waitForDesignSystemAndComponents();
  } else {
    // if document isn't ready yet, we register readystatechange event listener
    const eventName = 'readystatechange';
    const eventHandler = (): void => {
      if (isDocumentReady(readyState)) {
        document.removeEventListener(eventName, eventHandler);
        waitForDesignSystemAndComponents();
      }
    };
    document.addEventListener(eventName, eventHandler);
  }

  return promise;
};

const isDocumentReady = (readyState: DocumentReadyState): boolean => document.readyState === readyState;

const isDesignSystemReady = (): Promise<void> => {
  if ((document.porscheDesignSystem?.[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any)?.isReady) {
    return (document.porscheDesignSystem[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any).isReady();
  } else {
    // we are too early and the design system isn't initialized, yet
    // so we create a proxy to detect when the relevant version is set on document.porscheDesignSystem
    // and then wait for its isReady() promise to resolve
    // this can happen in tests
    let promiseResolve: () => void;
    const promise: Promise<void> = new Promise((resolve) => (promiseResolve = resolve));

    const proxyHandler = {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      set(_: any, prop: string, value: { isReady: () => Promise<void> }) {
        if (prop === ROLLUP_REPLACE_VERSION) {
          value.isReady().then(promiseResolve);
        }
        // @ts-expect-error ...
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

  if (el?.nodeType === Node.ELEMENT_NODE) {
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
