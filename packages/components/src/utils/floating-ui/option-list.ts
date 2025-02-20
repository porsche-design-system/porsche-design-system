import { computePosition, flip, offset, size } from '@floating-ui/dom';

export const OPTION_LIST_SAFE_ZONE = 6;

export const optionListUpdatePosition = async (
  direction: 'down' | 'up' | 'auto',
  anchor: HTMLElement,
  popover: HTMLElement
): Promise<void> => {
  const { x, y } = await computePosition(anchor, popover, {
    placement: direction === 'up' ? 'top' : 'bottom',
    middleware: [
      size({
        // @ts-expect-error
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
      offset(OPTION_LIST_SAFE_ZONE),
      flip({
        padding: OPTION_LIST_SAFE_ZONE,
        fallbackAxisSideDirection: 'none',
      }),
    ],
  });

  Object.assign(popover.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
};
