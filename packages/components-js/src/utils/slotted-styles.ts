const elementStyles = new Map();

export const getElementMap = (element: HTMLElement): Map<any, any> => {
  const tagName = element.tagName;
  const map = elementStyles.get(tagName);
  if (map !== undefined) {
    return map;
  }
  const newMap = new Map();
  elementStyles.set(tagName, newMap);
  return newMap;
};

export const getNodeToPrependTo = (rootNode: HTMLElement | Document): HTMLElement => {
  if (rootNode === document) {
    return rootNode.head;
  }
  return rootNode as HTMLElement;
};

/**
 * Adds an inheritable style for slotted content.
 * @param element
 * @param css - Make sure that css selectors are always in context of element (make sure that
 * it's created dynamically by e.g. `element.tagName.toLowerCase()`), e.g. `a:focus p-link-pure {…}`. Something like
 * providing only `a {…}` would cause unscoped global styling.
 * @returns void
 */
export const insertSlottedStyles = (element: HTMLElement, css: string): void => {
  const rootNode = element.getRootNode() as HTMLElement | Document;
  const elementMap = getElementMap(element);
  if (elementMap.get(rootNode) === undefined) {
    elementMap.set(rootNode, true);
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(minifySlottedStyles(css)));

    const prependTo = getNodeToPrependTo(rootNode);
    const charsetTag = prependTo.querySelector('meta[charset]');

    if (charsetTag !== null) {
      prependTo.insertBefore(style, charsetTag.nextSibling);
    } else if (prependTo.childNodes.length > 0) {
      prependTo.insertBefore(style, prependTo.firstChild);
    } else {
      prependTo.appendChild(style);
    }
  }
};

const minifySlottedStyles = (css: string): string =>
  css
    .replace(/\s{2,}|(\/\*.*\*\/)/g, '') // remove 2 and more white spaces + comments
    .replace(/\s?{\s?/g, '{') // remove space before and after opening curly bracket
    .replace(/\s?}\s?/g, '}') // remove space before and after closing curly bracket
    .replace(/:\s/g, ':'); // remove space after colon
