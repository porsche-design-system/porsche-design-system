import { applyStep } from './input-number-utils';

describe('applyStep()', () => {
  const step = 5;
  const min = 10;
  const max = 100;

  it('should snap increment to min when incrementing from below min', () => {
    expect(applyStep('3', step, 'increment', min, max)).toBe('10');
    expect(applyStep('9.9', step, 'increment', min, max)).toBe('10');
  });

  it('should do nothing when decrementing from below min', () => {
    expect(applyStep('3', step, 'decrement', min, max)).toBe('3');
    expect(applyStep('10', step, 'decrement', min, max)).toBe('10');
  });

  it('should snap decrement to max when decrementing from above max', () => {
    expect(applyStep('102', step, 'decrement', min, max)).toBe('100');
    expect(applyStep('150', step, 'decrement', min, max)).toBe('100');
  });

  it('should do nothing when incrementing from at-or-above max', () => {
    expect(applyStep('100', step, 'increment', min, max)).toBe('100');
    expect(applyStep('120', step, 'increment', min, max)).toBe('120');
  });

  it('should increment and decrement correctly within range', () => {
    expect(applyStep('10', step, 'increment', min, max)).toBe('15');
    expect(applyStep('95', step, 'increment', min, max)).toBe('100');
    expect(applyStep('5', step, 'increment')).toBe('10');
    expect(applyStep('10', step, 'decrement', min, max)).toBe('10');
    expect(applyStep('15', step, 'decrement', min, max)).toBe('10');
    expect(applyStep('10', step, 'decrement')).toBe('5');
  });

  it('should handle missing or invalid inputs gracefully', () => {
    expect(applyStep('', step, 'increment')).toBe('5');
    expect(applyStep(undefined, step, 'increment')).toBe('5');
  });

  it('should respect zero or undefined step (no movement)', () => {
    expect(applyStep('20', 0, 'increment', 10, 30)).toBe('20');
    expect(applyStep('20', undefined, 'decrement', 10, 30)).toBe('20');
  });
});
