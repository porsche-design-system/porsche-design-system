import { ComponentMeta, FOCUSABLE_TAG_NAMES_CAMEL_CASE, getComponentMeta, TAG_NAMES, TagName } from '../../../src';

describe('getComponentMeta()', () => {
  it('should match snapshot for getComponentMeta() dictionary', () => {
    let dict: { [key in TagName]: ComponentMeta };
    TAG_NAMES.forEach(
      (tagName) =>
        (dict = {
          ...dict,
          [tagName]: getComponentMeta(tagName),
        })
    );

    expect(dict).toMatchSnapshot();
  });
});

describe('FOCUSABLE_TAG_NAMES_CAMEL_CASE', () => {
  it('should match snapshot for FOCUSABLE_TAG_NAMES_CAMEL_CASE', () => {
    expect(FOCUSABLE_TAG_NAMES_CAMEL_CASE).toMatchSnapshot();
  });
});
