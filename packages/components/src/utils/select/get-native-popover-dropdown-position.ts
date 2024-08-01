import { type SelectComponentsDropdownDirection, determineDropdownDirection } from './';

export const getNativePopoverDropdownPosition = (
  positionReference: HTMLElement,
  visibleOptionsLength: number,
  nativePopover: HTMLElement,
  direction: SelectComponentsDropdownDirection
): void => {
  const { left, top, width, height } = positionReference.getBoundingClientRect();
  const isDirectionDown =
    direction === 'down' ||
    (direction === 'auto' && determineDropdownDirection(positionReference, visibleOptionsLength) === 'down');
  nativePopover.style.left = `${left + window.scrollX}px`;
  nativePopover.style.top = `${top + window.scrollY + (isDirectionDown ? height : 0)}px`;
  nativePopover.style.width = `${width}px`;
};
