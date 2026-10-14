import { FORM_FIELD_ARIA_ATTRIBUTES } from './form-field-aria-attribute';

describe('FORM_FIELD_ARIA_ATTRIBUTES', () => {
  it('should match snapshot', () => {
    expect(FORM_FIELD_ARIA_ATTRIBUTES).toMatchSnapshot();
  });
});
