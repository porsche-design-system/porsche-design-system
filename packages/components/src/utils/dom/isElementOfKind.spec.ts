import type { TagName } from '@porsche-design-system/shared';
import { isElementOfKind } from './isElementOfKind';

const combinations: [boolean, TagName, TagName][] = [
  [true, 'p-select-option', 'p-select-option'],
  [false, 'p-select-option', 'p-multi-select-option'],
];

describe('isElementOfKind()', () => {
  it.each<[boolean, TagName, TagName]>(combinations)(
    'should return %s for element %s and tag name %s',
    (isEqual, childTagName, tagName) => {
      const child = document.createElement(childTagName);
      expect(isElementOfKind(child, tagName)).toBe(isEqual);
    }
  );
});
