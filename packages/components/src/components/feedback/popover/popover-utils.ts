export type HorizontalDirection = 'left' | 'center' | 'right';
export type VerticalDirection = 'bottom' | 'center' | 'top';
export type PopoverDirection = { x: HorizontalDirection; y: VerticalDirection };

export const getElementOffsetCenter = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
};

export const getPopoverDirection = (element: HTMLElement): PopoverDirection => {
  const { x, y } = getElementOffsetCenter(element);
  const { innerWidth, innerHeight } = window;

  const xRelative = (x * 100) / innerWidth;
  const yRelative = (y * 100) / innerHeight - element.scrollTop;

  const oneThird = 10;
  const twoThirds = 80;

  const direction: PopoverDirection = {
    x: 'center',
    y: 'bottom',
  };

  if (xRelative < oneThird) {
    direction.x = 'right';
  } else if (xRelative >= oneThird && xRelative <= twoThirds) {
    direction.x = 'center';
  } else if (xRelative > twoThirds) {
    direction.x = 'left';
  }

  if (yRelative < oneThird) {
    direction.y = 'bottom';
  } else if (yRelative >= oneThird && yRelative <= twoThirds) {
    direction.y = 'center';
  } else if (yRelative > twoThirds) {
    direction.y = 'top';
  }

  return direction;
};
