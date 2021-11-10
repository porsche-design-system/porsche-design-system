export type VerticalPosition = 'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export type Position = {
  vertical: VerticalPosition;
  horizontal: HorizontalPosition;
};

export const getElementOffsetCenter = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect();

  return { x: left + width / 2, y: top + height / 2 };
};

export const getFlyoutDirection = (element: HTMLElement): { x: string; y: string } => {
  const { x, y } = getElementOffsetCenter(element);
  const { innerWidth, innerHeight } = window;

  const xRelative = (x * 100) / innerWidth;
  const yRelative = (y * 100) / innerHeight;

  const oneThird = 33.33333;
  const twoThirds = 66.66666;

  const direction = {
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
