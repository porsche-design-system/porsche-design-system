import { hasShadowDom } from './hasShadowDom';

export function improveLinkHandlingForCustomElement(element: HTMLElement) {
  if (!hasShadowDom(element)) {
    element.addEventListener('click', event => fixEventTarget(event, element), true);
  }
}

/**
 * IE11/Edge (not chromium based) workaround to
 * fix the event target of click events (which normally
 * shadow dom takes care of)
 *
 * caution: if the click event would be bound on
 * safari browsers with force touch, the force touch
 * functionality wouldn't work anymore. but since they
 * do have shadowDom the click event should never be
 * bound.
 */
function fixEventTarget(event: MouseEvent, element: HTMLElement): void {
  /**
   * caution: do not preventDefault here, else ie11 wouldn't work
   * anymore
   */
  event.stopPropagation();
  element.click();
}
