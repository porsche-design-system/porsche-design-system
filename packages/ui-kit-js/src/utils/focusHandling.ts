/**
 * keep attention to delegatesFocus which might help to
 * reduce logic and improve the behaviour in near future
 * https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
 */

function getFocusableElements(element: HTMLElement|ShadowRoot|Document = document): HTMLElement[] {
  /**
   * from https://github.com/salesforce/lwc/blob/28ac669d6f3e318bbebe74290b5a7ee6c6ceaa93/packages/%40lwc/synthetic-shadow/src/faux-shadow/focus.ts#L48
   */
  const tabbableElementsSelector = `
    button:not([tabindex="-1"]):not([disabled]),
    [contenteditable]:not([tabindex="-1"]),
    video[controls]:not([tabindex="-1"]),
    audio[controls]:not([tabindex="-1"]),
    [href]:not([tabindex="-1"]),
    input:not([tabindex="-1"]):not([disabled]),
    select:not([tabindex="-1"]):not([disabled]),
    textarea:not([tabindex="-1"]):not([disabled]),
    [tabindex="0"]
  `;

  /**
   * querySelectorAll returns matching elements in DOM order
   * that's important, since the tab order for elements with
   * the same tabindex is the dom order
   * https://www.w3.org/TR/selectors-api/#findelements
   */
  const focusableCandidatesList = element.querySelectorAll(tabbableElementsSelector);
  const focusable = [].slice.call(focusableCandidatesList);

  /**
   * sort does not change element order for compare function return value 0,
   * this ensures that our DOM order for elements with the same tabindex is
   * preserved
   * https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   */
  focusable.sort((a, b) => {
    return a.tabIndex - b.tabIndex;
  });

  return focusable;
}

function createFocusEvent(type: string, bubbles: boolean): FocusEvent {
  if (typeof FocusEvent === 'function') {
    return new FocusEvent(type, { bubbles });
  }

  /**
   * fallback for IE 11
   */
  const focusEvent = document.createEvent('FocusEvent');
  focusEvent.initEvent(type, bubbles, false);
  return focusEvent;
}

function getActiveElement(element: HTMLElement): HTMLElement {
  if (element.shadowRoot && element.shadowRoot.host) {
    return element.shadowRoot.activeElement as HTMLElement;
  }

  /**
   * fallback if there is no shadow root
   */
  const rootNode = element.getRootNode() as Document;
  return rootNode.activeElement as HTMLElement;
}

export function improveFocusHandlingForCustomElement(element: HTMLElement) {
  const childElementContainer = element.shadowRoot ? element.shadowRoot : element;
  element.focus = () => {
    const [firstFocusableChild, ] = getFocusableElements(childElementContainer);
    if (firstFocusableChild) {
      firstFocusableChild.focus();
    }
  };

  element.blur = () => {
    const activeElement = getActiveElement(element);
    if (activeElement && childElementContainer.contains(activeElement)) {
      activeElement.blur();
    }
  };

  if (!element.shadowRoot || !element.shadowRoot.host) {
    /**
     * we don't have a shadowRoot. this usually means we're in
     * IE11/Edge (not chromium based). but in any case we've to fix some
     * events that behave different without shadow dom
     */
    const firstChild = element.children.item(0);
    if (firstChild) {
      firstChild.addEventListener('focusin', (event: FocusEvent) => {
        const isRelatedTargetPartOfComponent = element.contains(event.relatedTarget as HTMLElement);
        if (!isRelatedTargetPartOfComponent) {
          element.dispatchEvent(createFocusEvent('focus', false));
          element.dispatchEvent(createFocusEvent('focusin', true));
        }
        event.stopPropagation();
      });

      firstChild.addEventListener('focusout', (event: FocusEvent) => {
        const isRelatedTargetPartOfComponent = element.contains(event.relatedTarget as HTMLElement);
        if (!isRelatedTargetPartOfComponent) {
          element.dispatchEvent(createFocusEvent('blur', false));
          element.dispatchEvent(createFocusEvent('focusout', true));
        }
        event.stopPropagation();
      });
    }
  }
}

interface FocusableComponent {
  nativeTabindex?: number;
  element: HTMLElement;
}

export function preventNativeTabIndex(component: FocusableComponent) {
  if (component.nativeTabindex > -1) {
    console.warn('You can not set the tabindex on the host element of Porsche UI-Kit components. Please use `tabbable` instead.');
    component.element.tabIndex = -1;
    component.element.removeAttribute('tabindex');
    component.nativeTabindex = -1;
  }
}
