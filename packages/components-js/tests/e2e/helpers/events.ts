import type { Locator, Page } from '@playwright/test';

type SerializedTarget = {
  nodeName: string;
  nodeValue: string | null;
  nodeType: number;
  tagName: string;
  className: string;
  id: string;
};

type EventStore<TDetail = unknown> = {
  [key: `${string}Counter`]: number;
  [key: `${string}Details`]: TDetail[];
  [key: `${string}Targets`]: SerializedTarget[];
};

export const addEventListener = (locator: Locator, eventName: string): Promise<void> => {
  return locator.evaluate((el, evtName) => {
    const counterKey: `${string}Counter` = `${evtName}Counter`;
    const detailsKey: `${string}Details` = `${evtName}Details`;
    const targetsKey: `${string}Targets` = `${evtName}Targets`;
    const store = el as unknown as EventStore;

    el.addEventListener(evtName, (e: Event) => {
      const { detail, target } = e as CustomEvent<unknown> & { target: HTMLElement };
      const serializedTarget: SerializedTarget = {
        nodeName: target.nodeName,
        nodeValue: target.nodeValue,
        nodeType: target.nodeType,
        tagName: target.tagName,
        className: target.className,
        id: target.id,
      };
      store[counterKey] = (store[counterKey] || 0) + 1;
      store[detailsKey] = [...(store[detailsKey] || []), detail];
      store[targetsKey] = [...(store[targetsKey] || []), serializedTarget];
    });
  }, eventName);
};

export const getEventSummary = (
  locator: Locator,
  eventName: string
): Promise<{ counter: number; details: any[]; targets: SerializedTarget[] }> => {
  return locator.evaluate((el, evtName) => {
    const counterKey: `${string}Counter` = `${evtName}Counter`;
    const detailsKey: `${string}Details` = `${evtName}Details`;
    const targetsKey: `${string}Targets` = `${evtName}Targets`;
    const store = el as unknown as EventStore;

    return {
      counter: store[counterKey] || 0,
      details: store[detailsKey] || [],
      targets: store[targetsKey] || [],
    };
  }, eventName);
};

export const waitForImproveButtonHandlingForCustomElement = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => !document.querySelector('form button'));
};
