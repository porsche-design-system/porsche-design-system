import { vi } from 'vitest';
import { runDefaultActionUnlessPrevented } from './runDefaultActionUnlessPrevented';

describe('runDefaultActionUnlessPrevented', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the default action after the event has been dispatched', () => {
    const defaultAction = vi.fn();
    runDefaultActionUnlessPrevented(new Event('keypress', { cancelable: true }), defaultAction);

    expect(defaultAction).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(defaultAction).toHaveBeenCalledTimes(1);
  });

  it('does not run the default action if the event was cancelled before or afterwards', () => {
    const defaultAction = vi.fn();
    const cancelledBefore = new Event('keypress', { cancelable: true });
    cancelledBefore.preventDefault();
    runDefaultActionUnlessPrevented(cancelledBefore, defaultAction);

    const cancelledAfterwards = new Event('keypress', { cancelable: true });
    runDefaultActionUnlessPrevented(cancelledAfterwards, defaultAction);
    cancelledAfterwards.preventDefault();

    vi.runAllTimers();
    expect(defaultAction).not.toHaveBeenCalled();
  });
});
