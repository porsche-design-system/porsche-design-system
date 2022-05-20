import { getIconName, isStateCompleteOrWarning, throwIfCurrentAndDisabled } from './stepper-horizontal-item-utils';

describe('isStateCompleteOrWarning()', () => {
  it('should return true if state is complete or warning', () => {
    expect(isStateCompleteOrWarning('complete')).toBe(true);
    expect(isStateCompleteOrWarning('warning')).toBe(true);
  });

  it('should return false if state is current', () => {
    expect(isStateCompleteOrWarning('current')).toBe(false);
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
