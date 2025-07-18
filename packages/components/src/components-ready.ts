import type { HostElement } from '@stencil/core/internal';
import type { PorscheDesignSystem } from './types';

type PromiseResolve = (amount: number) => void;

const documentReadyStateHierarchy: Record<DocumentReadyState, number> = {
  loading: 0,
  interactive: 1,
  complete: 2,
};

export const componentsReady = (
  el: HTMLElement = document.body,
  readyState: DocumentReadyState = 'complete'
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

const isDocumentReady = (requiredState: DocumentReadyState): boolean =>
  documentReadyStateHierarchy[document.readyState] >= documentReadyStateHierarchy[requiredState];

const isDesignSystemReady = (): Promise<void> => {
  if ((document.porscheDesignSystem?.[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any)?.isReady) {
    return (document.porscheDesignSystem[ROLLUP_REPLACE_VERSION as keyof PorscheDesignSystem] as any).isReady();
  }
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
      // biome-ignore lint/complexity/noArguments: ok
      return Reflect.set(...arguments);
    },
  };

  document.porscheDesignSystem = new Proxy(document.porscheDesignSystem || {}, proxyHandler);

  return promise;
};

const allComponentsLoaded = (el: HTMLElement, resolve: PromiseResolve): void => {
  const readyPromises = collectAllComponentOnReadyPromises(el);
  Promise.all(readyPromises)
    .then((proms) => resolve(proms.length))
    .catch((err) => console.error('[Porsche Design System]', err)); // eslint-disable-line no-console
};

const collectAllComponentOnReadyPromises = (el: HTMLElement): Promise<HostElement>[] => {
  const readyPromises: Promise<HostElement>[] = [];
  const stack: HostElement[] = [el];

  while (stack.length > 0) {
    const currentEl = stack.pop();

    if (currentEl.nodeType === Node.ELEMENT_NODE) {
      if (isDesignSystemElement(currentEl)) {
        readyPromises.push(currentEl.componentOnReady());
      }
      stack.push(...(Array.from(currentEl.children) as HostElement[]));
    }
  }

  return readyPromises;
};

const regex = /^(.*-)?P-(.*)$/;
const isDesignSystemElement = (el: HostElement): boolean => {
  return regex.test(el.tagName) && typeof el.componentOnReady === 'function';
};
