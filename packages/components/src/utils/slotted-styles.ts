import { getTagName } from './tag-name';

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

export const slottedCssMap = new Map<string, string>();

export const getCachedSlottedCss = (host: HTMLElement, getSlottedCss: (h: HTMLElement) => string): string => {
  const tagName = getTagName(host);

  if (!slottedCssMap.has(tagName)) {
    slottedCssMap.set(tagName, getSlottedCss(host));
  }

  return slottedCssMap.get(tagName);
};

/**
 * Adds an inheritable style for slotted content.
 * @param host
 * @param getSlottedCss - Make sure that css function are always in context of element (make sure that
 * it's created dynamically by e.g. `element.tagName.toLowerCase()`), e.g. `a:focus p-link-pure {…}`. Something like
 * providing only `a {…}` would cause unscoped global styling.
 * @returns void
 */
export const attachSlottedCss = (host: HTMLElement, getSlottedCss: (h: HTMLElement) => string): void => {
  const css = getCachedSlottedCss(host, getSlottedCss);
  const rootNode = host.getRootNode() as HTMLElementOrDocument;
  const elementMap = getElementMap(host);

  // isConnected check is needed because component may be removed from DOM in "parallel" and therefore
  // the style doesn't matter and could produce validation errors because it is appended as a child
  if (rootNode.isConnected && elementMap.get(rootNode) === undefined) {
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
