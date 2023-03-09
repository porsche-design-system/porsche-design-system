import * as getHTMLElementUtils from '../dom/getHTMLElement';
import { getNamedSlotOrThrow } from './getNamedSlotOrThrow';

it('should call getHTMLElement() with correct parameters', () => {
  const spy = jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValue(document.createElement('a'));
  const host = document.createElement('div');
  const slotName = 'slot';

  getNamedSlotOrThrow(host, slotName);

  expect(spy).toBeCalledWith(host, `[slot="${slotName}"]`);
});

it('should throw error if there is no named slot', () => {
  const host = document.createElement('div');
  const slotName = 'slot';

  expect(() => getNamedSlotOrThrow(host, slotName)).toThrowErrorMatchingInlineSnapshot(
    `"Named slot 'slot' is missing on element div"`
  );
});

it('should return result of getHTMLElement()', () => {
  const mockedEl = document.createElement('button');
  jest.spyOn(getHTMLElementUtils, 'getHTMLElement').mockReturnValue(mockedEl);
  const host = document.createElement('div');

  expect(getNamedSlotOrThrow(host, 'slot')).toBe(mockedEl);
});
