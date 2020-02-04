const elementStyles = new Map();

function getElementMap(element: HTMLElement) {
  const tagName = element.tagName;
  const map = elementStyles.get(tagName);
  if (map !== undefined) {
    return map;
  }
  const newMap = new Map();
  elementStyles.set(tagName, newMap);
  return newMap;
}

function getNodeToPrependTo(rootNode: Node) {
  if (rootNode === document) {
    return (rootNode as Document).head;
  }
  return rootNode;
}

/**
 * Adds an inheritable style for slotted content.
 * @param element
 * @param css - Make sure that css selectors are always in context of element (make sure that
 * it's created dynamically by e.g. `element.tagName.toLowerCase()`), e.g. `a:focus p-link-pure {…}`. Something like
 * providing only `a {…}` would cause unscoped global styling.
 * @returns void
 */
export function insertSlottedStyles(element: HTMLElement, css: string): void {
  const rootNode = element.getRootNode() as HTMLElement | Document;
  const elementMap = getElementMap(element);
  if (elementMap.get(rootNode) === undefined) {
    elementMap.set(rootNode, true);
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));

    const prependTo = getNodeToPrependTo(rootNode);
    if (prependTo.childNodes.length > 0) {
      prependTo.insertBefore(style, prependTo.firstChild);
      return;
    }

    prependTo.appendChild(style);
  }
}
