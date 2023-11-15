import { getPrefixedTagNames } from './tag-name';
import { scrollAreaClass } from './scroller-popover-utils';

export const addNativePopoverScrollAndResizeListeners = (
  host: HTMLElement,
  table: HTMLElement,
  nativePopover: HTMLElement,
  callback?: () => void
): void => {
  const tableScrollArea = table.shadowRoot
    .querySelector(getPrefixedTagNames(host).pScroller)
    .shadowRoot.querySelector(`.${scrollAreaClass}`);

  const hidePopover = (): void => {
    nativePopover.hidePopover();
    callback?.();
    window.removeEventListener('scroll', hidePopover);
    window.removeEventListener('resize', hidePopover);
    tableScrollArea.removeEventListener('scroll', hidePopover);
  };

  window.addEventListener('scroll', hidePopover, { once: true });
  window.addEventListener('resize', hidePopover, { once: true });
  tableScrollArea.addEventListener('scroll', hidePopover, { once: true });
};
