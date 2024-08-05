import type { Locator } from '@playwright/test';

type SerializedTarget = {
  nodeName: string;
  nodeValue: string;
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

    el.addEventListener(evtName, (e: CustomEvent & { target: HTMLElement }) => {
      const { detail, target } = e;
      const serializedTarget: SerializedTarget = {
        nodeName: target.nodeName,
        nodeValue: target.nodeValue,
        nodeType: target.nodeType,
        tagName: target.tagName,
        className: target.className,
        id: target.id,
      };
      el[counterKey] = (el[counterKey] || 0) + 1;
      el[detailsKey] = [...(el[detailsKey] || []), detail];
      el[targetsKey] = [...(el[targetsKey] || []), serializedTarget];
    });
  }, eventName);
};
