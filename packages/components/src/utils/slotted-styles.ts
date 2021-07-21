type HTMLElementOrDocument = HTMLElement | Document;
type ElementMap = Map<HTMLElementOrDocument, boolean>;

// TODO: why nested maps?
const elementStyles = new Map<string, ElementMap>();

export const getElementMap = (element: HTMLElement): ElementMap => {
  const { tagName } = element;
  let map = elementStyles.get(tagName);
  if (map === undefined) {
    map = new Map();
    elementStyles.set(tagName, map);
  }
  return map;
};

export const getNodeToPrependTo = (rootNode: HTMLElementOrDocument): HTMLElement => {
  return rootNode === document ? rootNode.head : (rootNode as HTMLElement);
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
  const rootNode = element.getRootNode() as HTMLElementOrDocument;
  const elementMap = getElementMap(element);
  if (elementMap.get(rootNode) === undefined) {
    elementMap.set(rootNode, true);
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));

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
