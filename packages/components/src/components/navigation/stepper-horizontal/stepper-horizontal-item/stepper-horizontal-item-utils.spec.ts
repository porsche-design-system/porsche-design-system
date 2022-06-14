import {
  getIconName,
  isItemClickable,
  isStateCompleteOrWarning,
  throwIfCurrentAndDisabled,
} from './stepper-horizontal-item-utils';
import type { StepperState } from './stepper-horizontal-item-utils';
import * as stepperHorizontalItemUtils from './stepper-horizontal-item-utils';

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

describe('getIconName()', () => {
  it('should return success when state is complete', () => {
    expect(getIconName('complete')).toBe('success');
  });

  it('should return warning when state is warning', () => {
    expect(getIconName('warning')).toBe('warning');
  });
});

describe('throwIfCurrentAndDisabled()', () => {
  it('should throw error if state is current and disabled true', () => {
    const host = { state: 'current', disabled: true };
    expect(() => throwIfCurrentAndDisabled(host as HTMLPStepperHorizontalItemElement)).toThrow();
  });

  it('should not throw error when state is not current and disabled', () => {
    const host1 = { state: 'warning', disabled: true };
    const host2 = { state: 'complete', disabled: true };

    expect(() => throwIfCurrentAndDisabled(host1 as HTMLPStepperHorizontalItemElement)).not.toThrow();
    expect(() => throwIfCurrentAndDisabled(host2 as HTMLPStepperHorizontalItemElement)).not.toThrow();
  });

  it('should not throw error when state is not current and not disabled', () => {
    const host1 = { state: 'warning', disabled: false };
    const host2 = { state: 'complete', disabled: false };

    expect(() => throwIfCurrentAndDisabled(host1 as HTMLPStepperHorizontalItemElement)).not.toThrow();
    expect(() => throwIfCurrentAndDisabled(host2 as HTMLPStepperHorizontalItemElement)).not.toThrow();
  });
});

describe('isItemClickable()', () => {
  it.each<[state: StepperState, disabled: boolean, expected: boolean]>([
    ['complete', true, false],
    ['warning', true, false],
    ['complete', true, false],
    [undefined, false, false],
    ['complete', false, true],
    ['warning', false, true],
    ['complete', false, true],
  ])('should for state %s and disabled %s return %s', (state, disabled, expected) => {
    expect(isItemClickable(state, disabled)).toBe(expected);
  });

  it('should call isStateCompleteOrWarning()', () => {
    const spy = jest.spyOn(stepperHorizontalItemUtils, 'isStateCompleteOrWarning');
    isItemClickable('current', false);

    expect(spy).toBeCalledWith('current');
  });
});
