'use client';

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from 'react';

type UseResizeHandleOptions = {
  /** Minimum width in pixels the preview can be shrunk to. */
  minWidth: number;
  /**
   * Pixels reserved within the track that are not available to the preview (e.g. the handle column).
   * The maximum width equals `track.clientWidth - maxWidthOffset`.
   */
  maxWidthOffset?: number;
  /** Step in pixels for ArrowLeft/ArrowRight. */
  step?: number;
  /** Larger step in pixels for PageUp/PageDown or Shift+Arrow. */
  largeStep?: number;
};

type UseResizeHandle = {
  /** Ref for the track element that constrains the maximum width. */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Current preview width in pixels, or `null` when full width. */
  width: number | null;
  /** Sets the preview width (use `null` to reset to full width). */
  setWidth: (width: number | null) => void;
  /** `true` while a pointer drag is in progress. */
  isResizing: boolean;
  /** Props to spread onto the `role="slider"` handle element. */
  handleProps: {
    role: 'slider';
    tabIndex: 0;
    'aria-orientation': 'vertical';
    'aria-label': string;
    'aria-valuemin': number;
    'aria-valuemax': number | undefined;
    'aria-valuenow': number;
    'aria-valuetext': string;
    onPointerDown: (e: ReactPointerEvent<HTMLElement>) => void;
    onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => void;
  };
};

/**
 * Shared resize logic for the preview viewers. Supports both pointer dragging and full keyboard operation
 * following the WAI-ARIA slider pattern (https://www.w3.org/WAI/ARIA/apg/patterns/slider/): the handle
 * selects a single width value within a range and can be moved with Arrow keys, Page Up/Down (larger step)
 * and Home/End (min/full width). A `slider` (rather than the window-splitter `separator`) is used because the
 * handle resizes a single preview against empty space, not two complementary panes.
 */
export const useResizeHandle = ({
  minWidth,
  maxWidthOffset = 0,
  step = 16,
  largeStep = 64,
}: UseResizeHandleOptions): UseResizeHandle => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null); // null = full width
  const [isResizing, setIsResizing] = useState(false);

  const getMaxWidth = (): number | null => {
    const track = trackRef.current;
    return track ? track.clientWidth - maxWidthOffset : null;
  };

  // Rounds to whole pixels so the stored width, the announced ARIA value and the rendered CSS width stay identical
  // (pointer dragging otherwise yields subpixel floats, which also cause blurry rendering).
  const clamp = (value: number, maxWidth: number): number => Math.round(Math.min(maxWidth, Math.max(minWidth, value)));

  const startResize = (e: ReactPointerEvent<HTMLElement>) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const handle = e.currentTarget;
    // Pointer capture keeps events flowing to the handle even when the cursor moves over the iframe.
    handle.setPointerCapture(e.pointerId);
    setIsResizing(true);

    // In RTL the preview grows from the right edge (start), so width is measured from the right edge instead of the left.
    const isRtl = getComputedStyle(track).direction === 'rtl';
    const trackRect = track.getBoundingClientRect();
    const maxWidth = track.clientWidth - maxWidthOffset;

    const onMove = (ev: PointerEvent) => {
      const distance = isRtl ? trackRect.right - ev.clientX : ev.clientX - trackRect.left;
      setWidth(clamp(distance, maxWidth));
    };
    // Idempotent teardown so it can safely run for whichever event ends the drag first.
    const stop = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', stop);
      handle.removeEventListener('pointercancel', stop);
      handle.removeEventListener('lostpointercapture', stop);
      // Capture may already be gone (e.g. after pointercancel); guard against that.
      if (handle.hasPointerCapture(e.pointerId)) {
        handle.releasePointerCapture(e.pointerId);
      }
      setIsResizing(false);
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', stop);
    // `pointercancel` fires instead of `pointerup` when the browser/OS takes over the gesture
    // (touch interruption, context menu, etc.); `lostpointercapture` catches any other capture loss.
    // Without these the drag would never stop and `isResizing` would stay `true` indefinitely.
    handle.addEventListener('pointercancel', stop);
    handle.addEventListener('lostpointercapture', stop);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    const maxWidth = getMaxWidth();
    if (maxWidth === null) {
      return;
    }
    // When full width, start from the current rendered width so the first key press feels natural.
    const current = width ?? maxWidth;
    let next: number | null | undefined;

    // In RTL the handle sits on the left and the preview grows leftwards, so mirror the horizontal arrow keys
    // to keep them aligned with the visual direction of movement.
    const isRtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const growKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const shrinkKey = isRtl ? 'ArrowRight' : 'ArrowLeft';

    switch (e.key) {
      case shrinkKey:
        next = clamp(current - (e.shiftKey ? largeStep : step), maxWidth);
        break;
      case growKey:
        next = clamp(current + (e.shiftKey ? largeStep : step), maxWidth);
        break;
      case 'PageDown':
        next = clamp(current - largeStep, maxWidth);
        break;
      case 'PageUp':
        next = clamp(current + largeStep, maxWidth);
        break;
      case 'Home':
        next = minWidth;
        break;
      case 'End':
        next = null; // reset to full width
        break;
      default:
        return;
    }

    e.preventDefault();
    setWidth(next);
  };

  const maxWidth = getMaxWidth() ?? undefined;
  // `role="slider"` requires a valid `aria-valuenow`. Before the track ref is attached (first render) both
  // `width` and `maxWidth` are unknown, so fall back to `minWidth` — which is always defined — to guarantee a number.
  const valueNow = width ?? maxWidth ?? minWidth;

  return {
    trackRef,
    width,
    setWidth,
    isResizing,
    handleProps: {
      role: 'slider',
      tabIndex: 0,
      'aria-orientation': 'vertical',
      'aria-label': 'Preview width. Use arrow keys to adjust, Home for minimum, End for full width.',
      'aria-valuemin': minWidth,
      'aria-valuemax': maxWidth,
      'aria-valuenow': valueNow,
      'aria-valuetext': `${valueNow} pixels`,
      onPointerDown: startResize,
      onKeyDown,
    },
  };
};
