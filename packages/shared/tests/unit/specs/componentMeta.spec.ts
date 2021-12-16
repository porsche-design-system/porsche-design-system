import { componentMeta, FOCUSABLE_TAG_NAMES_CAMEL_CASE } from '../../../src';

describe('componentMeta', () => {
  it('should match snapshot', () => {
    expect(componentMeta).toMatchSnapshot();
  });
});

describe('FOCUSABLE_TAG_NAMES_CAMEL_CASE', () => {
  it('should match snapshot', () => {
    expect(FOCUSABLE_TAG_NAMES_CAMEL_CASE).toMatchSnapshot();
  });
});
