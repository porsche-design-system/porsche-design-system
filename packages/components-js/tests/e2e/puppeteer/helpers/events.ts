import type { ElementHandle, JSHandle, Page } from 'puppeteer';

type SerializedTarget = {
  nodeName: string;
  nodeValue: string;
  nodeType: number;
  tagName: string;
  className: string;
  id: string;
};

export const addEventListenerNew = (handle: ElementHandle, eventName: string): Promise<void> => {
  return handle.evaluate((el, evtName) => {
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
      el[detailsKey] = [...el[detailsKey], detail];
      el[targetsKey] = [...el[targetsKey], serializedTarget];
    });
  }, eventName);
};

export const getEventSummary = (
  handle: ElementHandle,
  eventName: string
): Promise<{ counter: number; details: any[]; targets: SerializedTarget[] }> => {
  return handle.evaluate((el, evtName) => {
    const counterKey = `${evtName}Counter`;
    const detailsKey = `${evtName}Details`;
    const targetsKey = `${evtName}Targets`;

    return {
      counter: el[counterKey] || 0,
      details: el[detailsKey] || [],
      targets: el[targetsKey] || [],
    };
  }, eventName);
};

/**
 * copied and stripped down from
 * https://github.com/ionic-team/stencil/blob/master/src/testing/puppeteer/puppeteer-events.ts
 */

type WaitForEvent = {
  eventName: string;
  callback: (ev: any) => void;
};

const events = new Map<number, WaitForEvent>();

/**
 * @deprecated use `addEventListenerNew()`  instead
 */
export const initAddEventListener = async (page: Page) => {
  events.clear();

  await page.exposeFunction('puppeteerOnEvent', (id: number, ev: any) => {
    // NODE CONTEXT
    nodeContextEvents(events, id, ev);
  });

  // register helpers on window of browser context
  await page.evaluate(browserContextEvents);
};

/**
 * @deprecated use `addEventListenerNew()`
 */
export const addEventListener = async (elmHandle: JSHandle, eventName: string, callback: (ev: any) => void) => {
  // NODE CONTEXT
  const id = events.size;
  events.set(id, {
    eventName,
    callback,
  });

  // executionContext() became deprecated in 16.1.1 (2022-08-16)
  // and was made internal in v18
  const executionContext = (elmHandle as any).executionContext();

  // add element event listener
  await executionContext.evaluate(
    (elm: any, id: number, eventName: string) => {
      elm.addEventListener(eventName, (ev: any) => {
        (window as any).puppeteerOnEvent(id, (window as any).puppeteerSerializeEvent(ev));
      });
    },
    elmHandle,
    id,
    eventName
  );
};

/**
 * @deprecated use `addEventListenerNew()` and `getEventSummary()` instead
 */
export const waitForEventSerialization = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 5)); // event serialization takes a little bit
};

const nodeContextEvents = (waitForEvents: Map<number, WaitForEvent>, eventId: number, ev: any) => {
  // NODE CONTEXT
  waitForEvents.get(eventId)?.callback(ev);
};

const browserContextEvents = () => {
  // BROWSER CONTEXT

  (window as any).puppeteerSerializeEventTarget = (target: any) => {
    // BROWSER CONTEXT
    if (!target) {
      return null;
    } else if (target === window) {
      return { serializedWindow: true };
    } else if (target === document) {
      return { serializedDocument: true };
    } else if (target.nodeType != null) {
      return {
        serializedElement: true,
        nodeName: target.nodeName,
        nodeValue: target.nodeValue,
        nodeType: target.nodeType,
        tagName: target.tagName,
        className: target.className,
        id: target.id,
      };
    } else {
      return null;
    }
  };

  (window as any).puppeteerSerializeEvent = (orgEv: any) => ({
    // BROWSER CONTEXT
    bubbles: orgEv.bubbles,
    cancelBubble: orgEv.cancelBubble,
    cancelable: orgEv.cancelable,
    composed: orgEv.composed,
    currentTarget: (window as any).puppeteerSerializeEventTarget(orgEv.currentTarget),
    defaultPrevented: orgEv.defaultPrevented,
    detail: orgEv.detail,
    eventPhase: orgEv.eventPhase,
    isTrusted: orgEv.isTrusted,
    returnValue: orgEv.returnValue,
    srcElement: (window as any).puppeteerSerializeEventTarget(orgEv.srcElement),
    target: (window as any).puppeteerSerializeEventTarget(orgEv.target),
    timeStamp: orgEv.timeStamp,
    type: orgEv.type,
    isSerializedEvent: true,
  });
};
