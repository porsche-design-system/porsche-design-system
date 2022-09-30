import { isCustomDropdown } from './select-wrapper-utils';
import * as deviceDetectionUtils from '../../../utils/device-detection';

describe('isCustomDropdown()', () => {
  it.each<[boolean, boolean, boolean, boolean]>([
    [true, false, false, true],
    [true, true, false, true],
    [false, true, false, false],
    [false, false, false, true],
    [true, false, true, true],
    [true, true, true, true],
    [false, true, true, false],
    [false, false, true, false],
  ])('should for filter: %s, native: %s and isTouchDevice: %s return %s', (filter, native, isTouchDevice, expected) => {
    if (isTouchDevice) {
      jest.spyOn(deviceDetectionUtils, 'isTouchDevice').mockImplementation(() => true);
    }

    expect(isCustomDropdown(filter, native)).toBe(expected);
  });
});
