import { vi } from 'vitest';
import { syncFormState } from './syncFormState';

describe('syncFormState', () => {
  let internals: { setValidity: ReturnType<typeof vi.fn>; setFormValue: ReturnType<typeof vi.fn> };
  let input: HTMLInputElement;

  beforeEach(() => {
    internals = {
      setValidity: vi.fn(),
      setFormValue: vi.fn(),
    };
    input = document.createElement('input');
    input.required = true;
  });

  it('forwards validity and value when neither disabled nor readOnly', () => {
    syncFormState(internals as any, input, { disabled: false, readOnly: false, value: 'hello' });

    expect(internals.setValidity).toHaveBeenCalledTimes(1);
    expect(internals.setValidity).toHaveBeenCalledWith(input.validity, expect.any(String), input);
    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
  });

  it('falls back to a single space when validationMessage is empty', () => {
    const unconstrained = document.createElement('input');
    syncFormState(internals as any, unconstrained, { value: '' });
    expect(internals.setValidity).toHaveBeenCalledWith(unconstrained.validity, ' ', unconstrained);
  });

  it('clears validity and submits null when disabled', () => {
    syncFormState(internals as any, input, { disabled: true, value: 'ignored' });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    // No anchor element should be passed for the cleared state.
    expect(internals.setValidity).toHaveBeenCalledTimes(1);
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('clears validity but still submits value when readOnly', () => {
    syncFormState(internals as any, input, { readOnly: true, value: 'kept' });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(internals.setFormValue).toHaveBeenCalledWith('kept');
  });

  it('disabled takes precedence over readOnly', () => {
    syncFormState(internals as any, input, { disabled: true, readOnly: true, value: 'x' });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('calls setFormValue with null when value is omitted', () => {
    syncFormState(internals as any, input, { disabled: false, readOnly: false });

    expect(internals.setValidity).toHaveBeenCalledTimes(1);
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('calls setFormValue with null when value is omitted (disabled branch)', () => {
    syncFormState(internals as any, input, { disabled: true });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('treats null value as null on setFormValue (not omitted)', () => {
    syncFormState(internals as any, input, { value: null });
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('is a no-op on internals when internals is undefined', () => {
    expect(() => syncFormState(undefined, input, { value: 'x' })).not.toThrow();
  });
});


