import { getFieldsetAriaAttributes } from './fieldset-utils';

describe('getFieldsetAriaAttributes()', () => {
  it.each<
    [boolean, boolean, Parameters<typeof getFieldsetAriaAttributes>[2], ReturnType<typeof getFieldsetAriaAttributes>]
  >([
    [false, false, undefined, {}],
    [true, false, undefined, {}],
    [false, true, undefined, { 'aria-invalid': 'true' }],
    [true, true, undefined, { 'aria-invalid': 'true' }],
    [false, false, { role: 'radiogroup' }, { role: 'radiogroup' }],
    [true, false, { role: 'radiogroup' }, { role: 'radiogroup', 'aria-required': 'true' }],
    [false, true, { role: 'radiogroup' }, { role: 'radiogroup', 'aria-invalid': 'true' }],
    [true, true, { role: 'radiogroup' }, { role: 'radiogroup', 'aria-required': 'true', 'aria-invalid': 'true' }],
  ])('should return %j for isRequired: %s, isInvalid: %s, aria: %j', (isRequired, isInvalid, aria, expected) => {
    expect(getFieldsetAriaAttributes(isRequired, isInvalid, aria)).toEqual(expected);
  });
});
