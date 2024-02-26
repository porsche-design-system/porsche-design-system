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

const hasConstructableStylesheetSupport = ((): boolean => {
  try {
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch {
    return false;
  }
})(); // determine it once

// TODO: we can get rid of this fix, as soon as p-checkbox-wrapper and p-radio-button-wrapper have been deprecated and
//  replaced by encapsulated p-checkbox and p-radio-button component
export const applyCheckboxRadioButtonSafariRenderingFix = (element: HTMLElement): void => {
  if (hasConstructableStylesheetSupport) {
    const documentOrShadowRoot = element.getRootNode() as Document | ShadowRoot;
    const elementMap: ElementMap = getElementMap(element);

    if (!elementMap.has(documentOrShadowRoot)) {
      elementMap.set(documentOrShadowRoot, true);

      // Workaround for Safari >= 16.4 rendering issues (see #3012 for reference).
      // Checkbox/Radio-Button change is not rendered immediately if input or its label is still hovered.
      // The same bug appears on keyboard navigation.
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`${element.tagName.toLowerCase()}>input:checked{transform:rotateZ(0)}`);
      // TODO: for some reason unit test in Docker environment throws TS2339: Property 'push' does not exist on type 'readonly CSSStyleSheet[]'
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      documentOrShadowRoot.adoptedStyleSheets?.push(sheet);
    }
  }
};
