import { vi } from 'vitest';
import * as loggerUtils from '../../../utils/log/logger';
import type { StepperHorizontalItemState } from './stepper-horizontal-item-utils';
import {
  getStepperHorizontalIconName,
  isItemClickable,
  isStateCompleteOrWarning,
  logErrorIfCurrentAndDisabled,
} from './stepper-horizontal-item-utils';

const createItem = (state: StepperHorizontalItemState, disabled: boolean): HTMLElement =>
  Object.assign(document.createElement('p-stepper-horizontal-item'), { state, disabled });

describe('isStateCompleteOrWarning()', () => {
  it('should return true if state is complete or warning', () => {
    expect(isStateCompleteOrWarning('complete')).toBe(true);
    expect(isStateCompleteOrWarning('warning')).toBe(true);
  });

  it('should return false if state is current or undefined', () => {
    expect(isStateCompleteOrWarning('current')).toBe(false);
    expect(isStateCompleteOrWarning(undefined)).toBe(false);
  });
});

describe('getStepperHorizontalIconName()', () => {
  it('should return success when state is complete', () => {
    expect(getStepperHorizontalIconName('complete')).toBe('success');
  });

  it('should return warning when state is warning', () => {
    expect(getStepperHorizontalIconName('warning')).toBe('warning');
  });
});

describe('logErrorIfCurrentAndDisabled()', () => {
  it('should log error and not throw if state is current and disabled true', () => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const host = createItem('current', true);

    expect(() => logErrorIfCurrentAndDisabled(host)).not.toThrow();
    expect(spy).toHaveBeenCalledWith(
      "using state='current' and disabled='true' for p-stepper-horizontal-item is not allowed.",
      host
    );
  });

  it.each<[state: StepperHorizontalItemState, disabled: boolean]>([
    ['warning', true],
    ['complete', true],
    ['warning', false],
    ['complete', false],
    ['current', false],
  ])('should not log error for state %s and disabled %s', (state, disabled) => {
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    logErrorIfCurrentAndDisabled(createItem(state, disabled));
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('isItemClickable()', () => {
  it.each<[state: StepperHorizontalItemState, disabled: boolean, expected: boolean]>([
    ['complete', true, false],
    ['warning', true, false],
    ['current', true, false],
    [undefined, false, false],
    ['complete', false, true],
    ['warning', false, true],
    ['current', false, false],
  ])('should for state %s and disabled %s return %s', (state, disabled, expected) => {
    expect(isItemClickable(state, disabled)).toBe(expected);
  });
});
