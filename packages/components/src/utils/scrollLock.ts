export const setScrollLock = (isOpen: boolean) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
};
