export type HorizontalDirection = 'left' | 'center' | 'right';
export type VerticalDirection = 'bottom' | 'center' | 'top';
export type PopoverPosition = { x: number; y: number };

export const getElementOffsetCenter = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  console.log('element', top, left, width, height);

  return { x: left + width / 2, y: top + height / 2 };
};

export const getPopoverPosition = (popover: HTMLDivElement): number => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const { left: popoverOffsetLeft, width: popoverWidth } = popover.getBoundingClientRect();
  const safeZone = 16;

  console.log('left', popover.offsetLeft);
  console.log('document', viewportWidth, viewportHeight);
  console.log('popover', popoverOffsetLeft, popoverWidth);

  // const diffX = popoverOffsetLeft + popoverWidth - viewportWidth + safeZone;

  let popoverPositionLeft = popover.offsetLeft;

  console.log('position left', popoverPositionLeft);

  if (popoverOffsetLeft + popoverWidth > viewportWidth - safeZone) {
    popoverPositionLeft = popoverPositionLeft - (popoverOffsetLeft + popoverWidth - viewportWidth + safeZone);
  } else if (popoverOffsetLeft < safeZone) {
    popoverPositionLeft = popoverPositionLeft - popoverOffsetLeft + safeZone;
  }

  return popoverPositionLeft;

  // const xRelative = ((x + popover.scrollLeft) / innerWidth) * 100;
  // const yRelative = ((y + popover.scrollTop) / innerHeight) * 100;
  //
  // // const oneThird = 20;
  // // const twoThirds = 80;
  // //
  // const direction: PopoverPosition = {
  //   x: xRelative,
  //   y: yRelative,
  // };
  // //
  // // if (xRelative < oneThird) {
  // //   direction.x = 'right';
  // // } else if (xRelative >= oneThird && xRelative <= twoThirds) {
  // //   direction.x = 'center';
  // // } else if (xRelative > twoThirds) {
  // //   direction.x = 'left';
  // // }
  // //
  // // if (yRelative < oneThird) {
  // //   direction.y = 'bottom';
  // // } else if (yRelative >= oneThird && yRelative <= twoThirds) {
  // //   direction.y = 'center';
  // // } else if (yRelative > twoThirds) {
  // //   direction.y = 'top';
  // // }
  //
  // return direction;
};
