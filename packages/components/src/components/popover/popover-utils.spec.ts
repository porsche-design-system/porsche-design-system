import { vi } from 'vitest';
import {
  dispatchPopoverOpenEvent,
  getPopoverBorderRadius,
  POPOVER_OPEN_EVENT,
  type PopoverOpenEventDetail,
} from './popover-utils';

describe('getPopoverBorderRadius()', () => {
  const popover = document.createElement('div');

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['12px', 12], // non-compact radiusXl
    ['8px', 8], // compact radiusLg
    ['20px', 20], // custom via --p-popover-radius
    ['1.5px', 1.5], // fractional value
  ])('should return %s as %i', (borderRadius, expected) => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ borderRadius } as CSSStyleDeclaration);

    expect(getPopoverBorderRadius(popover)).toBe(expected);
  });

  it.each(['', 'unset', undefined])('should return fallback when border-radius is "%s"', (borderRadius) => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ borderRadius } as CSSStyleDeclaration);

    expect(getPopoverBorderRadius(popover)).toBe(12);
  });
});

describe('dispatchPopoverOpenEvent()', () => {
  it('should dispatch the popover open event on document with the source host as detail', () => {
    const source = document.createElement('p-popover');
    const spy = vi.fn();
    document.addEventListener(POPOVER_OPEN_EVENT, spy);

    dispatchPopoverOpenEvent(source);

    expect(spy).toHaveBeenCalledTimes(1);
    const event = spy.mock.calls[0][0] as CustomEvent<PopoverOpenEventDetail>;
    expect(event.detail.source).toBe(source);

    document.removeEventListener(POPOVER_OPEN_EVENT, spy);
  });
});

