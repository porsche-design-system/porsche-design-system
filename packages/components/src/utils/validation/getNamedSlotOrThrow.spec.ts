import { vi } from 'vitest';
import * as getNamedSlotUtils from '../getNamedSlot';
import { getNamedSlotOrThrow } from './getNamedSlotOrThrow';

it('should call getNamedSlot() with correct parameters', () => {
  const spy = vi.spyOn(getNamedSlotUtils, 'getNamedSlot').mockReturnValue(document.createElement('div'));
  const host = document.createElement('div');
  const slotName = 'slot';

  getNamedSlotOrThrow(host, slotName);

  expect(spy).toHaveBeenCalledWith(host, slotName);
});

it('should throw error if getNamedSlot() returns null', () => {
  vi.spyOn(getNamedSlotUtils, 'getNamedSlot').mockReturnValue(null);
  const host = document.createElement('div');

  expect(() => getNamedSlotOrThrow(host, 'slot')).toThrowErrorMatchingInlineSnapshot(
    `"[Porsche Design System] named slot='slot' is missing for component div."`
  );
});

it('should return result of getNamedSlot()', () => {
  const mockedEl = document.createElement('button');
  vi.spyOn(getNamedSlotUtils, 'getNamedSlot').mockReturnValue(mockedEl);
  const host = document.createElement('div');

  expect(getNamedSlotOrThrow(host, 'slot')).toBe(mockedEl);
});
