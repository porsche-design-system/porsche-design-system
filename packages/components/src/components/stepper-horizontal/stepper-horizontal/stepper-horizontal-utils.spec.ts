import { vi } from 'vitest';
import * as loggerUtils from '../../../utils/log/logger';
import {
  getIndexOfStepWithStateCurrent,
  logErrorIfMultipleCurrentStates,
  scrollStepperHorizontalItemIntoView,
} from './stepper-horizontal-utils';

const createStepperItems = (states: string[]): HTMLPStepperHorizontalItemElement[] =>
  states.map((state) => ({ state }) as HTMLPStepperHorizontalItemElement);

const createStepperItemsWithScrollIntoView = (count: number): HTMLElement[] =>
  Array.from({ length: count }, () => {
    const el = document.createElement('div');
    el.scrollIntoView = vi.fn();
    return el;
  });

describe('getIndexOfStepWithStateCurrent()', () => {
  it('should return -1 when no item has state "current"', () => {
    const items = createStepperItems(['complete', 'warning']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    expect(getIndexOfStepWithStateCurrent([])).toBe(-1);
  });

  it('should return the index of the item with state "current"', () => {
    const items = createStepperItems(['complete', 'current', 'undefined']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(1);
  });

  it('should return 0 when the first item has state "current"', () => {
    const items = createStepperItems(['current', 'complete']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(0);
  });

  it('should return the last index when the last item has state "current"', () => {
    const items = createStepperItems(['complete', 'complete', 'current']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(2);
  });

  it('should return the index of the first "current" item when multiple exist', () => {
    const items = createStepperItems(['complete', 'current', 'current']);
    expect(getIndexOfStepWithStateCurrent(items)).toBe(1);
  });
});

describe('logErrorIfMultipleCurrentStates()', () => {
  it('should not log error when no item has state "current"', () => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const host = document.createElement('p-stepper-horizontal');
    logErrorIfMultipleCurrentStates(host, createStepperItems(['complete', 'warning']));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not log error when exactly one item has state "current"', () => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const host = document.createElement('p-stepper-horizontal');
    logErrorIfMultipleCurrentStates(host, createStepperItems(['complete', 'current', 'warning']));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not log error for an empty array', () => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const host = document.createElement('p-stepper-horizontal');
    logErrorIfMultipleCurrentStates(host, []);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should log error with the count of current states and not throw when multiple items have state "current"', () => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const host = document.createElement('p-stepper-horizontal');
    expect(() =>
      logErrorIfMultipleCurrentStates(host, createStepperItems(['current', 'current', 'current']))
    ).not.toThrow();
    expect(spy).toHaveBeenCalledWith(
      'only one child with current state is allowed in p-stepper-horizontal but got 3.',
      host
    );
  });
});

describe('scrollStepperHorizontalItemIntoView()', () => {
  it('should not throw when scroller is undefined', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    expect(() => scrollStepperHorizontalItemIntoView(0, undefined, items)).not.toThrow();
    expect(items[0].scrollIntoView).not.toHaveBeenCalled();
  });

  it('should not throw when items array is empty', () => {
    const scroller = document.createElement('div');
    expect(() => scrollStepperHorizontalItemIntoView(0, scroller, [])).not.toThrow();
  });

  it('should not call scrollIntoView when stepIndex is undefined', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(undefined, scroller, items);
    for (const item of items) {
      expect(item.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should not call scrollIntoView when stepIndex is negative', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(-1, scroller, items);
    for (const item of items) {
      expect(item.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should not call scrollIntoView when stepIndex is out of range', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(5, scroller, items);
    for (const item of items) {
      expect(item.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should call scrollIntoView with smooth behavior by default', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(1, scroller, items);
    expect(items[1].scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
      container: 'nearest',
    });
  });

  it('should call scrollIntoView with instant behavior when isSmooth is false', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(1, scroller, items, false);
    expect(items[1].scrollIntoView).toHaveBeenCalledWith({
      behavior: 'instant',
      block: 'nearest',
      inline: 'center',
      container: 'nearest',
    });
  });

  it('should call scrollIntoView on the correct item', () => {
    const items = createStepperItemsWithScrollIntoView(5);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(3, scroller, items);
    expect(items[3].scrollIntoView).toHaveBeenCalledTimes(1);
    for (const item of items.filter((_, i) => i !== 3)) {
      expect(item.scrollIntoView).not.toHaveBeenCalled();
    }
  });

  it('should call scrollIntoView for the first item (index 0)', () => {
    const items = createStepperItemsWithScrollIntoView(3);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(0, scroller, items);
    expect(items[0].scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('should call scrollIntoView for the last item', () => {
    const items = createStepperItemsWithScrollIntoView(4);
    const scroller = document.createElement('div');
    scrollStepperHorizontalItemIntoView(3, scroller, items);
    expect(items[3].scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
