export const setScrollLock = (isOpen: boolean): void => {
  const {
    body: { style, parentElement: htmlEl },
  } = document;

  if (isOpen) {
    style.top = -htmlEl.scrollTop + 'px';
    style.overflowY = 'scroll';
    style.position = 'fixed';
  } else {
    const topValue = -parseInt(style.top, 10);
    style.top = '';
    style.overflowY = '';
    style.position = '';
    htmlEl.scrollTop = topValue;
  }
};
