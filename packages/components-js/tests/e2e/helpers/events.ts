import { JSHandle, Page } from 'puppeteer';

/**
 * copied and stripped down from
 * https://github.com/ionic-team/stencil/blob/master/src/testing/puppeteer/puppeteer-events.ts
 */

type WaitForEvent = {
  eventName: string;
  callback: (ev: any) => void;
};

const events = new Map<number, WaitForEvent>();

export const initAddEventListener = async (page: Page) => {
  events.clear();

  await page.exposeFunction('puppeteerOnEvent', (id: number, ev: any) => {
    // NODE CONTEXT
    nodeContextEvents(events, id, ev);
  });

  // register helpers on window of browser context
  await page.evaluate(browserContextEvents);
};

export const addEventListener = async (elmHandle: JSHandle, eventName: string, callback: (ev: any) => void) => {
  // NODE CONTEXT
  const id = events.size;
  events.set(id, {
    eventName,
    callback
  });

  const executionContext = elmHandle.executionContext();

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
        id: target.id
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
    isSerializedEvent: true
  });
};
