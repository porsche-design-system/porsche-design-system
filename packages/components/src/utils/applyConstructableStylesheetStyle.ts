import type { Styles } from 'jss';
import { getCss } from './jss';

type ElementsMap = Map<string, ElementMap>;
type ElementMap = Map<Document | ShadowRoot, boolean>;

const elementsMap: ElementsMap = new Map();

const getElementMap = (element: HTMLElement): ElementMap => {
  const tagName = element.tagName;
  if (!elementsMap.has(tagName)) {
    elementsMap.set(tagName, new Map());
  }
  return elementsMap.get(tagName);
};

// TODO: Use function from ./jss (Causes bundling issues)
const hasConstructableStylesheetSupport = ((): boolean => {
  try {
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch {
    return false;
  }
})(); // determine it once

export const applyConstructableStylesheetStyles = (
  element: HTMLElement,
  ...getStyles: ((tagName: string) => Styles)[]
): void => {
  if (hasConstructableStylesheetSupport) {
    const documentOrShadowRoot = element.getRootNode() as Document | ShadowRoot;
    const elementMap: ElementMap = getElementMap(element);

    if (!elementMap.has(documentOrShadowRoot)) {
      elementMap.set(documentOrShadowRoot, true);

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(getStyles.map((getStyle) => getCss(getStyle(element.tagName.toLowerCase()))).join(''));
      // TODO: for some reason unit test in Docker environment throws TS2339: Property 'push' does not exist on type 'readonly CSSStyleSheet[]'
      /* eslint-disable @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */
      documentOrShadowRoot.adoptedStyleSheets?.push(sheet);
    }
  }
};
