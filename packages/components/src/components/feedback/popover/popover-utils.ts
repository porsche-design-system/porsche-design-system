import { Popover } from './popover';

export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = typeof POPOVER_DIRECTIONS[number];

const safeZone = 16;

export const isWithinViewport = (
  spacer: HTMLDivElement,
  popover: HTMLDivElement,
  direction: PopoverDirection
): boolean => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const { top: spacerTop, right: spacerRight, bottom: spacerBottom, left: spacerLeft } = spacer.getBoundingClientRect();
  const {
    top: popoverTop,
    right: popoverRight,
    bottom: popoverBottom,
    left: popoverLeft,
  } = popover.getBoundingClientRect();

  const isWithinXAxis = spacerLeft >= safeZone && spacerRight <= viewportWidth - safeZone;
  const isWithinYAxis = spacerTop >= safeZone && spacerBottom <= viewportHeight - safeZone;

  switch (direction) {
    case 'top':
      return popoverTop >= safeZone && isWithinXAxis;
    case 'right':
      return popoverRight <= viewportWidth - safeZone && isWithinYAxis;
    case 'bottom':
      return popoverBottom <= viewportHeight - safeZone && isWithinXAxis;
    case 'left':
      return popoverLeft >= safeZone && isWithinYAxis;
  }
};

type PopoverBoundingBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const calcSpaceForDirections = (spacer: HTMLDivElement, popover: HTMLDivElement): PopoverBoundingBox => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const { top: spacerTop, left: spacerLeft, bottom: spacerBottom, right: spacerRight } = spacer.getBoundingClientRect();
  const { width: popoverWidth, height: popoverHeight } = popover.getBoundingClientRect();

  // determine the **theoretically** maximum available space in all directions within viewport
  return {
    top: spacerTop - popoverHeight,
    right: viewportWidth - (spacerRight + popoverWidth),
    bottom: viewportHeight - (spacerBottom + popoverHeight),
    left: spacerLeft - popoverWidth,
  };
};

export const getAutoDirection = (spacer: HTMLDivElement, popover: HTMLDivElement): PopoverDirection => {
  const direction = calcSpaceForDirections(spacer, popover);

  return Object.keys(direction).reduce((a, b) => (direction[a] > direction[b] ? a : b)) as PopoverDirection;
};

export const getOffset = (spacer: HTMLDivElement, popover: HTMLDivElement, direction: PopoverDirection): string => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const {
    top: spacerTop,
    right: spacerRight,
    bottom: spacerBottom,
    left: spacerLeft,
    width: spacerWidth,
    height: spacerHeight,
  } = spacer.getBoundingClientRect();
  const {
    top: popoverTop,
    right: popoverRight,
    bottom: popoverBottom,
    left: popoverLeft,
    width: popoverWidth,
    height: popoverHeight,
  } = popover.getBoundingClientRect();

  let offset = '0';

  // check x-axis offset is relevant for popover
  if (['top', 'bottom'].includes(direction) && popoverWidth > spacerWidth) {
    // check if popover exceeds left side of viewport
    if (popoverLeft < safeZone) {
      offset = `0 0 0 ${Math.min(safeZone - popoverLeft, spacerLeft - popoverLeft)}px`;
    }
    // check if popover exceeds right side of viewport
    else if (popoverRight > viewportWidth - safeZone) {
      offset = `0 0 0 ${Math.max(viewportWidth - safeZone - popoverRight, spacerRight - popoverRight)}px`;
    }
  }
  // check y-axis offset is relevant for popover
  else if (['left', 'right'].includes(direction) && popoverHeight > spacerHeight) {
    // check if popover exceeds top side of viewport
    if (popoverTop < safeZone) {
      offset = `${Math.min(safeZone - popoverTop, spacerTop - popoverTop)}px 0 0 0`;
    }
    // check if popover exceeds bottom side of viewport
    else if (popoverBottom > viewportHeight - safeZone) {
      offset = `${Math.max(viewportHeight - safeZone - popoverBottom, spacerBottom - popoverBottom)}px 0 0 0`;
    }
  }

  return offset;
};

export const registeredPopovers: Popover[] = [];

export const onClickOutside = (clickEvent: MouseEvent): void => {
  registeredPopovers.forEach((popover) => {
    if (popover.open && !clickEvent.composedPath().includes(popover.host)) {
      popover.open = false;
    }
  });
};

export const onKeyboardPress = (clickEvent: KeyboardEvent): void => {
  registeredPopovers.forEach((popover) => {
    if (popover.open) {
      if (
        (clickEvent.key === 'SpaceBar' || clickEvent.key === 'Enter' || clickEvent.key === ' ') &&
        !clickEvent.composedPath().includes(popover.host)
      ) {
        popover.open = false;
      }
    }
  });
};

export function observeClickOutside(popover: Popover) {
  if (!registeredPopovers.includes(popover)) {
    registeredPopovers.push(popover);
  }
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', onKeyboardPress);
}

export function unobserveClickOutside(node): void {
  const index = registeredPopovers.indexOf(node);
  if (index > -1) {
    registeredPopovers.splice(index, 1);
  }
  if (registeredPopovers.length === 0) {
    document.removeEventListener('mousedown', onClickOutside);
    document.removeEventListener('keydown', onKeyboardPress);
  }
}
