export type Direction = 'top' | 'right' | 'bottom' | 'left';

const safeZone = 16;

export const isPopoverWithinViewport = (popover: HTMLDivElement, direction: Direction): boolean => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const {
    left: popoverLeft,
    width: popoverWidth,
    top: popoverTop,
    height: popoverHeight,
  } = popover.getBoundingClientRect();

  const isWithinTopArea = (): boolean => popoverTop >= safeZone;
  const isWithinRightArea = (): boolean => popoverLeft + popoverWidth + safeZone <= viewportWidth;
  const isWithinBottomArea = (): boolean => popoverTop + popoverHeight + safeZone <= viewportHeight;
  const isWithinLeftArea = (): boolean => popoverLeft >= safeZone;

  switch (direction) {
    case 'top':
      return isWithinTopArea() && isWithinRightArea() && isWithinLeftArea();
    case 'right':
      return isWithinRightArea() && isWithinTopArea() && isWithinBottomArea();
    case 'bottom':
      return isWithinBottomArea() && isWithinRightArea() && isWithinLeftArea();
    case 'left':
      return isWithinLeftArea() && isWithinTopArea() && isWithinBottomArea();
  }
};

export const getAutoPosition = (host: HTMLElement, popover: HTMLDivElement): Direction => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const { top: hostTop, left: hostLeft, width: hostWidth, height: hostHeight } = host.getBoundingClientRect();
  const { width: popoverWidth, height: popoverHeight } = popover.getBoundingClientRect();

  // TODO: 2rem spacing is missing in calculation for all directions
  // determine the **theoretically** maximum available space in all directions within viewport
  const direction = {
    top: hostTop - popoverHeight,
    right: viewportWidth - (hostLeft + hostWidth + popoverWidth),
    bottom: viewportHeight - (hostTop + hostHeight + popoverHeight),
    left: hostLeft - popoverWidth,
  };

  return Object.keys(direction).reduce((a, b) => (direction[a] > direction[b] ? a : b)) as Direction;
};

// TODO: clean up + readability
export const getOffsetX = (popover: HTMLDivElement): number => {
  const { clientWidth: viewportWidth } = document.documentElement;
  // offset relative to viewport
  const { left: popoverOffsetLeft, width: popoverWidth } = popover.getBoundingClientRect();

  // offset relative to parent
  let popoverPositionLeft = popover.offsetLeft;

  // check if popover exceeds right side of viewport
  if (popoverOffsetLeft + popoverWidth > viewportWidth - safeZone) {
    popoverPositionLeft = popoverPositionLeft - (popoverOffsetLeft + popoverWidth - viewportWidth + safeZone);
  }
  // check if popover exceeds left side of viewport
  else if (popoverOffsetLeft < safeZone) {
    popoverPositionLeft = popoverPositionLeft - popoverOffsetLeft + safeZone;
  }

  const hostWidth = 12;
  return popoverPositionLeft - hostWidth;
};

// TODO: clean up + readability
export const getOffsetY = (popover: HTMLDivElement): number => {
  const { clientHeight: viewportHeight } = document.documentElement;
  // offset relative to viewport
  const { top: popoverOffsetTop, height: popoverHeight } = popover.getBoundingClientRect();

  // offset relative to parent
  let popoverPositionTop = popover.offsetTop;

  // check if popover exceeds bottom of viewport
  if (popoverOffsetTop + popoverHeight > viewportHeight - safeZone) {
    popoverPositionTop = popoverPositionTop - (popoverOffsetTop + popoverHeight - viewportHeight + safeZone);
  }
  // check if popover exceeds top of viewport
  else if (popoverOffsetTop < safeZone) {
    popoverPositionTop = popoverPositionTop - popoverOffsetTop + safeZone;
  }

  const hostHeight = 12;
  return popoverPositionTop - hostHeight;
};
