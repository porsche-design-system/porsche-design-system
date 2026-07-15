import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useResizeHandle } from '@/hooks/useResizeHandle';

const MIN_WIDTH = 320;
const TRACK_WIDTH = 1000;

const TestComponent = (options?: Partial<Parameters<typeof useResizeHandle>[0]>) => {
  const { trackRef, width, setWidth, isResizing, handleProps } = useResizeHandle({ minWidth: MIN_WIDTH, ...options });

  return (
    <>
      <div ref={trackRef} data-testid="track">
        <div data-testid="handle" {...handleProps} />
      </div>
      <div data-testid="width">{String(width)}</div>
      <div data-testid="resizing">{String(isResizing)}</div>
      <button type="button" onClick={() => setWidth(null)}>
        Reset
      </button>
    </>
  );
};

const renderHook = (options?: Partial<Parameters<typeof useResizeHandle>[0]>) => {
  render(<TestComponent {...options} />);
  const track = screen.getByTestId('track');
  const handle = screen.getByTestId('handle');
  // jsdom reports clientWidth as 0; stub it so getMaxWidth() is deterministic.
  Object.defineProperty(track, 'clientWidth', { value: TRACK_WIDTH, configurable: true });
  // jsdom's getBoundingClientRect returns all-zero, so trackLeft = 0 (sufficient for the math).
  // jsdom lacks pointer capture APIs used during drag.
  (handle as any).setPointerCapture = vi.fn();
  (handle as any).releasePointerCapture = vi.fn();
  (handle as any).hasPointerCapture = vi.fn().mockReturnValue(true);
  return { track, handle };
};

// Force RTL by stubbing getComputedStyle().direction and providing a non-zero track rect
// so the right-edge based math is exercised (jsdom returns all-zero rects by default).
const setRtl = (track: HTMLElement) => {
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: 'rtl' } as CSSStyleDeclaration);
  track.getBoundingClientRect = vi.fn(
    () => ({ left: 0, right: TRACK_WIDTH, top: 0, bottom: 0, width: TRACK_WIDTH, height: 0, x: 0, y: 0 }) as DOMRect
  );
};

const getWidth = () => screen.getByTestId('width').textContent;
const getResizing = () => screen.getByTestId('resizing').textContent;

describe('useResizeHandle', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('handleProps / ARIA', () => {
    it('should expose the WAI-ARIA window splitter semantics', () => {
      const { handle } = renderHook();

      expect(handle).toHaveAttribute('role', 'separator');
      expect(handle).toHaveAttribute('tabindex', '0');
      expect(handle).toHaveAttribute('aria-orientation', 'vertical');
      expect(handle).toHaveAttribute('aria-valuemin', String(MIN_WIDTH));
      expect(handle).toHaveAttribute('aria-label');
    });

    it('should update aria-valuenow, aria-valuetext and aria-valuemax to reflect the current width', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'ArrowLeft' });

      expect(handle).toHaveAttribute('aria-valuenow', '984');
      expect(handle).toHaveAttribute('aria-valuetext', '984 pixels');
      expect(handle).toHaveAttribute('aria-valuemax', String(TRACK_WIDTH));
    });
  });

  describe('keyboard resizing', () => {
    it('should start from the full track width on first ArrowLeft and step by the default step', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'ArrowLeft' });

      expect(getWidth()).toBe(String(TRACK_WIDTH - 16));
    });

    it('should grow with ArrowRight and clamp to the max track width', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'ArrowLeft' }); // 984
      fireEvent.keyDown(handle, { key: 'ArrowRight' }); // 1000
      fireEvent.keyDown(handle, { key: 'ArrowRight' }); // clamped to 1000

      expect(getWidth()).toBe(String(TRACK_WIDTH));
    });

    it('should use the large step when Shift is held', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'ArrowLeft', shiftKey: true });

      expect(getWidth()).toBe(String(TRACK_WIDTH - 64));
    });

    it('should use the large step for PageDown and PageUp', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'PageDown' }); // 936

      expect(getWidth()).toBe(String(TRACK_WIDTH - 64));

      fireEvent.keyDown(handle, { key: 'PageUp' }); // 1000

      expect(getWidth()).toBe(String(TRACK_WIDTH));
    });

    it('should jump to the minimum width on Home', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'Home' });

      expect(getWidth()).toBe(String(MIN_WIDTH));
    });

    it('should reset to full width (null) on End', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'Home' }); // 320
      fireEvent.keyDown(handle, { key: 'End' }); // null

      expect(getWidth()).toBe('null');
    });

    it('should never shrink below the minimum width', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'Home' }); // 320 (min)
      fireEvent.keyDown(handle, { key: 'ArrowLeft' }); // still 320

      expect(getWidth()).toBe(String(MIN_WIDTH));
    });

    it('should ignore unrelated keys', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'a' });

      expect(getWidth()).toBe('null');
    });
  });

  describe('pointer resizing', () => {
    it('should set isResizing while dragging and clear it on pointer up', () => {
      const { handle } = renderHook();

      expect(getResizing()).toBe('false');

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      expect(getResizing()).toBe('true');
      expect((handle as any).setPointerCapture).toHaveBeenCalledWith(1);

      fireEvent.pointerUp(handle, { pointerId: 1 });
      expect(getResizing()).toBe('false');
      expect((handle as any).releasePointerCapture).toHaveBeenCalledWith(1);
    });

    it('should update the width based on the pointer position during a drag', () => {
      const { handle } = renderHook();

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      fireEvent.pointerMove(handle, { clientX: 600 });

      expect(getWidth()).toBe('600');
    });

    it('should clamp the dragged width between min and max', () => {
      const { handle } = renderHook();

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });

      fireEvent.pointerMove(handle, { clientX: 10 }); // below min
      expect(getWidth()).toBe(String(MIN_WIDTH));

      fireEvent.pointerMove(handle, { clientX: 5000 }); // above max
      expect(getWidth()).toBe(String(TRACK_WIDTH));
    });

    it('should stop updating the width after the pointer is released', () => {
      const { handle } = renderHook();

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      fireEvent.pointerMove(handle, { clientX: 600 });
      expect(getWidth()).toBe('600');

      fireEvent.pointerUp(handle, { pointerId: 1 });
      fireEvent.pointerMove(handle, { clientX: 800 }); // ignored, listeners removed

      expect(getWidth()).toBe('600');
    });

    it('should stop resizing and detach listeners on pointer cancel', () => {
      const { handle } = renderHook();

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      fireEvent.pointerMove(handle, { clientX: 600 });
      expect(getResizing()).toBe('true');
      expect(getWidth()).toBe('600');

      // A pointercancel (touch interruption, context menu, OS gesture) fires instead of pointerup.
      fireEvent.pointerCancel(handle, { pointerId: 1 });
      expect(getResizing()).toBe('false');
      expect((handle as any).releasePointerCapture).toHaveBeenCalledWith(1);

      // Listeners are gone, so later moves must not change the width.
      fireEvent.pointerMove(handle, { clientX: 800 });
      expect(getWidth()).toBe('600');
    });

    it('should stop resizing when pointer capture is lost', () => {
      const { handle } = renderHook();

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      fireEvent.pointerMove(handle, { clientX: 600 });
      expect(getResizing()).toBe('true');

      fireEvent(handle, new Event('lostpointercapture'));
      expect(getResizing()).toBe('false');

      fireEvent.pointerMove(handle, { clientX: 800 });
      expect(getWidth()).toBe('600');
    });

    it('should not release pointer capture during teardown when it is no longer held', () => {
      const { handle } = renderHook();
      (handle as any).hasPointerCapture = vi.fn().mockReturnValue(false);

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 500 });
      fireEvent.pointerCancel(handle, { pointerId: 1 });

      expect(getResizing()).toBe('false');
      expect((handle as any).releasePointerCapture).not.toHaveBeenCalled();
    });
  });

  describe('RTL (right-to-left)', () => {
    it('should mirror ArrowLeft to grow the width', () => {
      const { track, handle } = renderHook();
      setRtl(track);

      fireEvent.keyDown(handle, { key: 'ArrowRight' }); // shrink from full width -> 984
      fireEvent.keyDown(handle, { key: 'ArrowLeft' }); // grow back -> 1000

      expect(getWidth()).toBe(String(TRACK_WIDTH));
    });

    it('should mirror ArrowRight to shrink the width', () => {
      const { track, handle } = renderHook();
      setRtl(track);

      fireEvent.keyDown(handle, { key: 'ArrowRight' });

      expect(getWidth()).toBe(String(TRACK_WIDTH - 16));
    });

    it('should measure the dragged width from the right edge of the track', () => {
      const { track, handle } = renderHook();
      setRtl(track);

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 800 });
      fireEvent.pointerMove(handle, { clientX: 600 }); // right(1000) - 600 = 400

      expect(getWidth()).toBe('400');
    });

    it('should clamp the dragged width between min and max in RTL', () => {
      const { track, handle } = renderHook();
      setRtl(track);

      fireEvent.pointerDown(handle, { pointerId: 1, clientX: 800 });

      fireEvent.pointerMove(handle, { clientX: 900 }); // right(1000) - 900 = 100 -> min
      expect(getWidth()).toBe(String(MIN_WIDTH));

      fireEvent.pointerMove(handle, { clientX: -500 }); // right(1000) - (-500) = 1500 -> max
      expect(getWidth()).toBe(String(TRACK_WIDTH));
    });
  });

  describe('options', () => {
    it('should reduce the max width by maxWidthOffset and reflect it in aria-valuemax', () => {
      const { handle } = renderHook({ maxWidthOffset: 24 });

      // Growing beyond the offset-adjusted max should clamp to it.
      fireEvent.keyDown(handle, { key: 'ArrowLeft' }); // starts from max (976), shrink -> 960
      fireEvent.keyDown(handle, { key: 'ArrowRight' }); // grow -> 976
      fireEvent.keyDown(handle, { key: 'ArrowRight' }); // clamped -> 976

      expect(getWidth()).toBe(String(TRACK_WIDTH - 24));
      expect(handle).toHaveAttribute('aria-valuemax', String(TRACK_WIDTH - 24));
    });

    it('should use a custom step for the arrow keys', () => {
      const { handle } = renderHook({ step: 50 });

      fireEvent.keyDown(handle, { key: 'ArrowLeft' });

      expect(getWidth()).toBe(String(TRACK_WIDTH - 50));
    });

    it('should use a custom largeStep for Shift+Arrow and Page keys', () => {
      const { handle } = renderHook({ largeStep: 200 });

      fireEvent.keyDown(handle, { key: 'ArrowLeft', shiftKey: true });
      expect(getWidth()).toBe(String(TRACK_WIDTH - 200));

      fireEvent.keyDown(handle, { key: 'PageUp' });
      expect(getWidth()).toBe(String(TRACK_WIDTH));

      fireEvent.keyDown(handle, { key: 'PageDown' });
      expect(getWidth()).toBe(String(TRACK_WIDTH - 200));
    });
  });

  describe('setWidth', () => {
    it('should reset the width to full (null) via the returned setter', () => {
      const { handle } = renderHook();

      fireEvent.keyDown(handle, { key: 'Home' }); // 320
      expect(getWidth()).toBe(String(MIN_WIDTH));

      fireEvent.click(screen.getByText('Reset'));
      expect(getWidth()).toBe('null');
    });
  });
});


