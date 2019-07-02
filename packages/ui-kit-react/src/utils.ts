/**
 * Checks if an event is supported in the current execution environment.
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
export function isCoveredByReact(eventNameSuffix: string, doc: Document = document) {
  const eventName = 'on' + eventNameSuffix;
  let isSupported = eventName in doc;

  if (!isSupported) {
    const element = doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof (element as any)[eventName] === 'function';
  }

  return isSupported;
}

export function syncEvent(node: Element, eventName: string, newEventHandler: (e: Event) => any) {
  const eventStore = (node as any).__events || ((node as any).__events = {});
  const oldEventHandler = eventStore[eventName];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventName, oldEventHandler);
  }

  // Bind new listener.
  node.addEventListener(eventName, eventStore[eventName] = function handler(e: Event) {
    newEventHandler.call(this, e);
  });
}

export const dashToPascalCase = (str: string) => str.toLowerCase().split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');

export function ensureElementInBody<E extends HTMLElement>(elementName: string): E {
  let element = document.querySelector<E>(elementName);
  if (!element) {
    element = document.createElement(elementName) as E;
    document.body.appendChild(element);
  }
  return element;
}

export function attachEventProps<E extends HTMLElement>(node: E, props: any) {
  Object.keys(props).forEach(name => {
    if (name === 'children' || name === 'style' || name === 'ref') {
      return;
    }

    if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
      const eventName = name.substring(2);
      const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);

      if (!isCoveredByReact(eventNameLc)) {
        syncEvent(node, eventNameLc, props[name]);
      }
    } else {
      (node as any)[name] = props[name];
    }
  });
}
