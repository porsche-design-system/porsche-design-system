import { Popover } from './popover';

export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = typeof POPOVER_DIRECTIONS[number];

const safeZonePx = 16;

export const isElementWithinViewport = (
  spacer: HTMLDivElement,
  popover: HTMLDivElement,
  direction: PopoverDirection
): boolean => {
  const { clientWidth, clientHeight } = document.documentElement;
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const isWithinXAxis = spacerRect.left >= safeZonePx && spacerRect.right <= clientWidth - safeZonePx;
  const isWithinYAxis = spacerRect.top >= safeZonePx && spacerRect.bottom <= clientHeight - safeZonePx;

  switch (direction) {
    case 'top':
      return isWithinXAxis && popoverRect.top >= safeZonePx;
    case 'right':
      return isWithinYAxis && popoverRect.right <= clientWidth - safeZonePx;
    case 'bottom':
      return isWithinXAxis && popoverRect.bottom <= clientHeight - safeZonePx;
    case 'left':
      return isWithinYAxis && popoverRect.left >= safeZonePx;
  }
};

export const calcSpaceForDirections = (
  spacer: HTMLDivElement,
  popover: HTMLDivElement
): { [key in PopoverDirection]: number } => {
  const { clientWidth, clientHeight } = document.documentElement;
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  // determine the **theoretically** maximum available space in all directions within viewport
  return {
    top: spacerRect.top - popoverRect.height,
    right: clientWidth - (spacerRect.right + popoverRect.width),
    bottom: clientHeight - (spacerRect.bottom + popoverRect.height),
    left: spacerRect.left - popoverRect.width,
  };
};

export const getAutoDirection = (spacer: HTMLDivElement, popover: HTMLDivElement): PopoverDirection => {
  const directionSpaces = calcSpaceForDirections(spacer, popover);

  return (Object.keys(directionSpaces) as PopoverDirection[]).reduce(
    (resultDirection, currentDirection) =>
      directionSpaces[resultDirection] > directionSpaces[currentDirection] ? resultDirection : currentDirection,
    'bottom'
  );
};

export const getOffset = (spacer: HTMLDivElement, popover: HTMLDivElement, direction: PopoverDirection): string => {
  const { clientWidth, clientHeight } = document.documentElement;
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  let offset = '0';

  // check x-axis offset is relevant for popover
  if (['top', 'bottom'].includes(direction) && popoverRect.width > spacerRect.width) {
    // check if popover exceeds left side of viewport
    if (popoverRect.left < safeZonePx) {
      offset = `0 0 0 ${Math.min(safeZonePx - popoverRect.left, spacerRect.left - popoverRect.left)}px`;
    }
    // check if popover exceeds right side of viewport
    else if (popoverRect.right > clientWidth - safeZonePx) {
      offset = `0 0 0 ${Math.max(
        clientWidth - safeZonePx - popoverRect.right,
        spacerRect.right - popoverRect.right
      )}px`;
    }
  }
  // check y-axis offset is relevant for popover
  else if (['left', 'right'].includes(direction) && popoverRect.height > spacerRect.height) {
    // check if popover exceeds top side of viewport
    if (popoverRect.top < safeZonePx) {
      offset = `${Math.min(safeZonePx - popoverRect.top, spacerRect.top - popoverRect.top)}px 0 0 0`;
    }
    // check if popover exceeds bottom side of viewport
    else if (popoverRect.bottom > clientHeight - safeZonePx) {
      offset = `${Math.max(
        clientHeight - safeZonePx - popoverRect.bottom,
        spacerRect.bottom - popoverRect.bottom
      )}px 0 0 0`;
    }
  }

  return offset;
};

export const registeredPopovers: Popover[] = [];

export const onDocumentMousedown = (e: MouseEvent): void => {
  const popover = registeredPopovers.find((popover) => popover.open && !e.composedPath().includes(popover.host));
  if (popover) {
    popover.open = false;
  }
};

export const onDocumentKeydown = (e: KeyboardEvent): void => {
  const { key } = e;
  const isEscape = ['Escape', 'Esc'].includes(key);
  if (isEscape || ['SpaceBar', 'Enter', ' '].includes(key)) {
    const popover = registeredPopovers.find(
      (popover) => popover.open && (isEscape || !e.composedPath().includes(popover.host))
    );
    if (popover) {
      popover.open = false;
    }
  }
};

export const observeClickOutside = (popover: Popover): void => {
  if (!registeredPopovers.includes(popover)) {
    registeredPopovers.push(popover);
  }
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', onKeyboardPress);
};

export const unobserveClickOutside = (popover: Popover): void => {
  const index = registeredPopovers.indexOf(popover);
  if (index > -1) {
    registeredPopovers.splice(index, 1);
  }
  if (registeredPopovers.length === 0) {
    document.removeEventListener('mousedown', onClickOutside);
    document.removeEventListener('keydown', onKeyboardPress);
  }
};
