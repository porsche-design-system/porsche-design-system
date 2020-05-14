export const initBlurOnFocus = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.addEventListener('click', () => {
    const element = document.activeElement;
    /**
     * this additional condition is an ie11 workaround
     * when the active element get's removed before
     * the listener is called, the activeElement on ie11
     * will be null. (other browsers will always have an
     * active element, body as fallback)
     * you can test it with:
     * document.activeElement.removeNode();
     * console.log(document.activeElement);
     */
    if (element) {
      const optOutElement = element.closest('.p-re-enable-focus-on-click');
      const isExcluded = ['SELECT', 'INPUT', 'TEXTAREA'].includes(element.tagName);
      if (optOutElement === null && !isExcluded) {
        (element as HTMLElement).blur();
      }
    }
  });
};
