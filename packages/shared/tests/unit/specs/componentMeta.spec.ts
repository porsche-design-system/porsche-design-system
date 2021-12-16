import { FOCUSABLE_TAG_NAMES_CAMEL_CASE, getComponentMeta, TAG_NAMES } from '../../../src';

describe('getComponentMeta()', () => {
  it.each(TAG_NAMES)('should match snapshot for %s', (tagName) => {
    expect(getComponentMeta(tagName)).toMatchSnapshot();
  });
});

describe('FOCUSABLE_TAG_NAMES_CAMEL_CASE', () => {
  it('should match snapshot for %s', () => {
    expect(FOCUSABLE_TAG_NAMES_CAMEL_CASE).toMatchSnapshot();
  });
});
