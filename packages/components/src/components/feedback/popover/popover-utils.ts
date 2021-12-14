import { Popover } from './popover';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './popover-styles';

export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = typeof POPOVER_DIRECTIONS[number];

const safeZonePx = 16;

export const updatePopoverStyles = (
  host: HTMLElement,
  spacer: HTMLDivElement,
  popover: HTMLDivElement,
  direction: PopoverDirection
): void => {
  // Reset margin so that it can be recalculated correctly
  popover.style.margin = '0';
  if (!isElementWithinViewport(spacer, popover, direction)) {
    direction = getAutoDirection(spacer, popover);
    attachComponentCss(host, getComponentCss, direction);
  }
  // Set margin via inline style to make attachComponentCss cacheable
  popover.style.margin = getPopoverMargin(spacer, popover, direction);
};

const getDocumentHeightWidthWithoutSafeZone = (): { clientWidth: number; clientHeight: number } => {
  const { clientWidth, clientHeight } = document.documentElement;
  return { clientWidth: clientWidth - safeZonePx, clientHeight: clientHeight - safeZonePx };
};

export const isElementWithinViewport = (
  spacer: HTMLDivElement,
  popover: HTMLDivElement,
  direction: PopoverDirection
): boolean => {
  const { clientWidth, clientHeight } = getDocumentHeightWidthWithoutSafeZone();
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const isWithinXAxis = spacerRect.left >= safeZonePx && spacerRect.right <= clientWidth;
  const isWithinYAxis = spacerRect.top >= safeZonePx && spacerRect.bottom <= clientHeight;

  switch (direction) {
    case 'top':
      return isWithinXAxis && popoverRect.top >= safeZonePx;
    case 'right':
      return isWithinYAxis && popoverRect.right <= clientWidth;
    case 'bottom':
      return isWithinXAxis && popoverRect.bottom <= clientHeight;
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
  // Find direction with the most space
  return (Object.keys(directionSpaces) as PopoverDirection[]).reduce(
    (resultDirection, currentDirection) =>
      directionSpaces[resultDirection] >= directionSpaces[currentDirection] ? resultDirection : currentDirection,
    'bottom'
  );
};

export const getPopoverMargin = (
  spacer: HTMLDivElement,
  popover: HTMLDivElement,
  direction: PopoverDirection
): string => {
  const { clientWidth, clientHeight } = getDocumentHeightWidthWithoutSafeZone();
  const spacerRect = spacer.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  // check x-axis offset is relevant for popover
  if (['top', 'bottom'].includes(direction) && popoverRect.width > spacerRect.width) {
    // check if popover exceeds left side of viewport
    if (popoverRect.left < safeZonePx) {
      return `0 0 0 ${Math.min(safeZonePx - popoverRect.left, spacerRect.left - popoverRect.left)}px`;
    }
    // check if popover exceeds right side of viewport
    else if (popoverRect.right > clientWidth) {
      return `0 0 0 ${Math.max(clientWidth - popoverRect.right, spacerRect.right - popoverRect.right)}px`;
    }
  }
  // check y-axis offset is relevant for popover
  else if (['left', 'right'].includes(direction) && popoverRect.height > spacerRect.height) {
    // check if popover exceeds top side of viewport
    if (popoverRect.top < safeZonePx) {
      return `${Math.min(safeZonePx - popoverRect.top, spacerRect.top - popoverRect.top)}px 0 0 0`;
    }
    // check if popover exceeds bottom side of viewport
    else if (popoverRect.bottom > clientHeight) {
      return `${Math.max(clientHeight - popoverRect.bottom, spacerRect.bottom - popoverRect.bottom)}px 0 0 0`;
    }
  } else {
    return '0';
  }
};

export const registeredPopovers: Popover[] = [];

export const addDocumentEventListener = (popover: Popover): void => {
  if (!registeredPopovers.includes(popover)) {
    registeredPopovers.push(popover);
    document.addEventListener('mousedown', onDocumentMousedown);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

export const removeDocumentEventListener = (popover: Popover): void => {
  const index = registeredPopovers.indexOf(popover);
  if (index > -1) {
    registeredPopovers.splice(index, 1);
  }
  if (registeredPopovers.length === 0) {
    document.removeEventListener('mousedown', onDocumentMousedown);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

export const onDocumentMousedown = (e: MouseEvent): void => {
  const popover = registeredPopovers.find(
    (popoverElement) => popoverElement.open && !e.composedPath().includes(popoverElement.host)
  );
  if (popover) {
    popover.open = false;
  }
};

export const onDocumentKeydown = (e: KeyboardEvent): void => {
  const { key } = e;
  const isEscape = ['Escape', 'Esc'].includes(key);
  if (isEscape || ['SpaceBar', 'Enter', ' '].includes(key)) {
    const popover = registeredPopovers.find(
      (popoverElement) => popoverElement.open && (isEscape || !e.composedPath().includes(popoverElement.host))
    );
    if (popover) {
      popover.open = false;
    }
  }
};
