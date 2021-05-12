/**
 * keep attention to delegatesFocus which might help to
 * reduce logic and improve the behaviour in near future
 * https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
 */

const getFocusableElement = (element: HTMLElement | ShadowRoot | Document = document): HTMLElement => {
  /**
   * from https://github.com/salesforce/lwc/blob/28ac669d6f3e318bbebe74290b5a7ee6c6ceaa93/packages/%40lwc/synthetic-shadow/src/faux-shadow/focus.ts#L48
   */
  const notDisabled = ':not([disabled])';
  const tabbableElementsSelector = [
    `button${notDisabled}`,
    '[contenteditable]',
    'video[controls]',
    'audio[controls]',
    '[href]',
    `input${notDisabled}`,
    `select${notDisabled}`,
    `textarea${notDisabled}`,
    '[tabindex="0"]',
  ].join(':not([tabindex="-1"]),');

  const focusableCandidatesList = Array.from<HTMLElement>(element.querySelectorAll(tabbableElementsSelector));
  return focusableCandidatesList.sort((a, b) => a.tabIndex - b.tabIndex)[0];
};

export const improveFocusHandlingForCustomElement = (element: HTMLElement): void => {
  const { shadowRoot } = element;
  element.focus = (): void => {
    getFocusableElement(shadowRoot)?.focus();
  };

  element.blur = (): void => {
    (shadowRoot.activeElement as HTMLElement)?.blur();
  };
};
