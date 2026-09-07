import type { Locator } from '@playwright/test';

type SerializedTarget = {
  nodeName: string;
  nodeValue: string | null;
  nodeType: number;
  tagName: string;
  className: string;
  id: string;
};

export const addEventListener = (locator: Locator, eventName: string): Promise<void> => {
  return locator.evaluate((el, evtName) => {
    const counterKey = `${evtName}Counter`;
    const detailsKey = `${evtName}Details`;
    const targetsKey = `${evtName}Targets`;
    const store = el as unknown as Record<string, any>;

    el.addEventListener(evtName, (e: Event) => {
      const { detail, target } = e as CustomEvent & { target: HTMLElement };
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
