export const initBlurOnFocus = (): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.addEventListener('click', () => {
    const element = document.activeElement;
    const optOutElement = element.closest('.p-re-enable-focus-on-click');
    const isExcluded = ['SELECT', 'INPUT', 'TEXTAREA'].includes(element.tagName);
    if (optOutElement === null && !isExcluded) {
      (document.activeElement as HTMLElement).blur();
    }
  });
};
