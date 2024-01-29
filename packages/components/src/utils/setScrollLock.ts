export const setScrollLock = (isOpen: boolean): void => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
};
