import type { FormState } from '../../utils/form/form-state';
import { INPUT_BASE_AUTO_COMPLETE } from '../common/input-base/input-base-utils';
export type InputNumberState = FormState;

export const INPUT_NUMBER_AUTO_COMPLETE = INPUT_BASE_AUTO_COMPLETE;
export type InputNumberAutoComplete = (typeof INPUT_NUMBER_AUTO_COMPLETE)[number];

export type InputNumberChangeEventDetail = Event;
export type InputNumberBlurEventDetail = Event;
export type InputNumberInputEventDetail = InputEvent;

/**
 * Returns the new value after applying a step increment or decrement,
 * mimicking native <input type="number"> behavior:
 *  • Increment from below min: snap up to min
 *  • Decrement from below min: no change
 *  • Decrement from above max: snap down to max
 *  • Increment from above max: no change
 *  • Within [min,max]: move ±step
 *
 * @param currentValue  current value as string (parsed to float, default 0)
 * @param step          step amount (default 0)
 * @param direction     'increment' to add, 'decrement' to subtract
 * @param min           optional lower bound (inclusive)
 * @param max           optional upper bound (inclusive)
 */
export function applyStep(
  currentValue: string | undefined,
  step: number | undefined,
  direction: 'increment' | 'decrement',
  min?: number,
  max?: number
): string {
  const current = Number.parseFloat(currentValue ?? '') || 0;
  const delta = step ?? 0;

  if (direction === 'increment') {
    if (min !== undefined && current < min) {
      return String(min);
    }
    if (max !== undefined && current >= max) {
      return String(current);
    }
    const inc = current + delta;
    return String(max !== undefined ? Math.min(inc, max) : inc);
  }
  if (max !== undefined && current > max) {
    return String(max);
  }
  if (min !== undefined && current <= min) {
    return String(current);
  }
  const dec = current - delta;
  return String(min !== undefined ? Math.max(dec, min) : dec);
}
