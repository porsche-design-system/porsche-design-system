import { vi } from 'vitest';
import { getMaxTransitionDurationMs } from './getMaxTransitionDurationMs';

const mockComputedTransition = (transitionDuration: string, transitionDelay: string): void => {
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    transitionDuration,
    transitionDelay,
  } as unknown as CSSStyleDeclaration);
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getMaxTransitionDurationMs()', () => {
  const element = document.createElement('div');

  it('should convert seconds to milliseconds', () => {
    mockComputedTransition('0.6s', '0s');
    expect(getMaxTransitionDurationMs(element)).toBe(600);
  });

  it('should keep milliseconds as-is', () => {
    mockComputedTransition('250ms', '0ms');
    expect(getMaxTransitionDurationMs(element)).toBe(250);
  });

  it('should add duration and delay', () => {
    mockComputedTransition('0.2s', '0.1s');
    expect(getMaxTransitionDurationMs(element)).toBe(300);
  });

  it('should return the maximum of multiple comma-separated transitions', () => {
    mockComputedTransition('0.2s, 0.6s, 0.1s', '0s, 0.1s, 0s');
    expect(getMaxTransitionDurationMs(element)).toBe(700); // 0.6s + 0.1s
  });

  it('should return 0 when there is no transition', () => {
    mockComputedTransition('0s', '0s');
    expect(getMaxTransitionDurationMs(element)).toBe(0);
  });
});
