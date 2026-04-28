import { mergeInputNativeAria } from './input-base-utils';

describe('mergeInputNativeAria', () => {
  it('should merge passthrough ARIA with built-in values', () => {
    expect(
      mergeInputNativeAria(
        { role: 'combobox', 'aria-expanded': true },
        {
          'aria-describedby': 'd1 m1',
          'aria-invalid': 'true',
          'aria-disabled': null,
          'aria-readonly': null,
        }
      )
    ).toEqual({
      role: 'combobox',
      'aria-expanded': 'true',
      'aria-describedby': 'd1 m1',
      'aria-invalid': 'true',
      'aria-disabled': null,
      'aria-readonly': null,
    });
  });

  it('should let built-in attributes override conflicting passthrough keys', () => {
    expect(
      mergeInputNativeAria(
        {
          'aria-invalid': 'false',
          'aria-disabled': 'true',
          'aria-readonly': 'false',
          'aria-describedby': 'wrong',
        },
        {
          'aria-describedby': 'correct',
          'aria-invalid': 'true',
          'aria-disabled': null,
          'aria-readonly': 'true',
        }
      )
    ).toEqual({
      'aria-describedby': 'correct',
      'aria-invalid': 'true',
      'aria-disabled': null,
      'aria-readonly': 'true',
    });
  });

  it('should parse JSON string passthrough', () => {
    expect(
      mergeInputNativeAria('{"role":"combobox","aria-expanded":false}', {
        'aria-describedby': null,
        'aria-invalid': null,
        'aria-disabled': null,
        'aria-readonly': null,
      })
    ).toEqual({
      role: 'combobox',
      'aria-expanded': 'false',
      'aria-describedby': null,
      'aria-invalid': null,
      'aria-disabled': null,
      'aria-readonly': null,
    });
  });
});
