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

  // TODO: also check cross-axis
  switch (direction) {
    case 'top':
      return popoverTop > safeZone;
    case 'right':
      return popoverLeft + popoverWidth + safeZone < viewportWidth;
    case 'bottom':
      return popoverTop + popoverHeight + safeZone < viewportHeight;
    case 'left':
      return popoverLeft > safeZone;
  }
};

export const getAutoPosition = (host: HTMLElement, popover: HTMLDivElement): Direction => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const { top: hostTop, left: hostLeft, width: hostWidth, height: hostHeight } = host.getBoundingClientRect();
  const { width: popoverWidth, height: popoverHeight } = popover.getBoundingClientRect();

  const direction = {
    top: hostTop - popoverHeight,
    right: viewportWidth - (hostLeft + hostWidth) - popoverWidth,
    bottom: viewportHeight - (hostTop + hostHeight) - popoverHeight,
    left: hostLeft - popoverWidth,
  };

  return Object.keys(direction).reduce((a, b) => (direction[a] > direction[b] ? a : b)) as Direction;
};

// TODO: clean up + readability
export const getOffsetX = (popover: HTMLDivElement): number => {
  const { clientWidth: viewportWidth } = document.documentElement;
  const { left: popoverOffsetLeft, width: popoverWidth } = popover.getBoundingClientRect();

  let popoverPositionLeft = popover.offsetLeft;

  if (popoverOffsetLeft + popoverWidth > viewportWidth - safeZone) {
    popoverPositionLeft = popoverPositionLeft - (popoverOffsetLeft + popoverWidth - viewportWidth + safeZone);
  } else if (popoverOffsetLeft < safeZone) {
    popoverPositionLeft = popoverPositionLeft - popoverOffsetLeft + safeZone;
  }

  const hostWidth = 12;
  return popoverPositionLeft - hostWidth;
};

// TODO: clean up + readability
export const getOffsetY = (popover: HTMLDivElement): number => {
  const { clientHeight: viewportHeight } = document.documentElement;
  const { top: popoverOffsetTop, height: popoverHeight } = popover.getBoundingClientRect();

  let popoverPositionTop = popover.offsetTop;

  if (popoverOffsetTop + popoverHeight > viewportHeight - safeZone) {
    popoverPositionTop = popoverPositionTop - (popoverOffsetTop + popoverHeight - viewportHeight + safeZone);
  } else if (popoverOffsetTop < safeZone) {
    popoverPositionTop = popoverPositionTop - popoverOffsetTop + safeZone;
  }

  const hostHeight = 12;
  return popoverPositionTop - hostHeight;
};
