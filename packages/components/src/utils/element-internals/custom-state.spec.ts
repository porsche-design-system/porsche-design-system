import { vi } from 'vitest';
import { setCustomState, setCustomStates } from './custom-state';

type MockCustomStateSet = {
  add: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

const getMockInternals = (states?: MockCustomStateSet): ElementInternals => ({ states }) as unknown as ElementInternals;

const getMockStates = (): MockCustomStateSet => ({ add: vi.fn(), delete: vi.fn() });

describe('setCustomState()', () => {
  it('should add state if active', () => {
    const states = getMockStates();
    setCustomState(getMockInternals(states), 'disabled', true);

    expect(states.add).toHaveBeenCalledWith('disabled');
    expect(states.delete).not.toHaveBeenCalled();
  });

  it('should delete state if not active', () => {
    const states = getMockStates();
    setCustomState(getMockInternals(states), 'disabled', false);

    expect(states.delete).toHaveBeenCalledWith('disabled');
    expect(states.add).not.toHaveBeenCalled();
  });

  it('should not throw if internals is undefined', () => {
    expect(() => setCustomState(undefined, 'disabled', true)).not.toThrow();
  });

  it('should not throw if CustomStateSet is not supported', () => {
    expect(() => setCustomState(getMockInternals(), 'disabled', true)).not.toThrow();
  });

  it('should fall back to dashed ident syntax if plain ident throws', () => {
    const states = getMockStates();
    states.add.mockImplementationOnce(() => {
      throw new DOMException('Invalid ident', 'SyntaxError');
    });

    setCustomState(getMockInternals(states), 'disabled', true);

    expect(states.add).toHaveBeenNthCalledWith(1, 'disabled');
    expect(states.add).toHaveBeenNthCalledWith(2, '--disabled');
  });

  it('should fall back to dashed ident syntax on delete if plain ident throws', () => {
    const states = getMockStates();
    states.delete.mockImplementationOnce(() => {
      throw new DOMException('Invalid ident', 'SyntaxError');
    });

    setCustomState(getMockInternals(states), 'disabled', false);

    expect(states.delete).toHaveBeenNthCalledWith(1, 'disabled');
    expect(states.delete).toHaveBeenNthCalledWith(2, '--disabled');
  });

  it('should not throw if both ident syntaxes throw', () => {
    const states = getMockStates();
    states.add.mockImplementation(() => {
      throw new DOMException('Invalid ident', 'SyntaxError');
    });

    expect(() => setCustomState(getMockInternals(states), 'disabled', true)).not.toThrow();
  });
});

describe('setCustomStates()', () => {
  it('should add and delete states depending on their value', () => {
    const states = getMockStates();
    setCustomStates(getMockInternals(states), { disabled: true, loading: false, 'variant-primary': true });

    expect(states.add).toHaveBeenNthCalledWith(1, 'disabled');
    expect(states.add).toHaveBeenNthCalledWith(2, 'variant-primary');
    expect(states.delete).toHaveBeenCalledWith('loading');
  });

  it('should not throw if internals is undefined', () => {
    expect(() => setCustomStates(undefined, { disabled: true })).not.toThrow();
  });
});
