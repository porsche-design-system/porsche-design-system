import { describe, it, vi } from 'vitest';
import * as breakpointCustomizableUtils from '../breakpoint-customizable';
import * as jsonUtils from '../json';
import * as loggerUtils from '../log/logger';
import {
  AllowedTypes,
  formatArrayOutput,
  formatObjectOutput,
  getAriaStructure,
  getBreakpointCustomizableStructure,
  getShapeStructure,
  isBreakpointCustomizableValueInvalid,
  isValidArray,
  isValueNotOfType,
  printErrorMessage,
  type ValidationError,
  type ValidatorFunction,
  validateProps,
  validateValueOfType,
} from './validateProps';

describe('isValueNotOfType()', () => {
  it.each<[any, string, boolean]>([
    [true, 'boolean', false],
    [false, 'boolean', false],
    [undefined, 'boolean', false],
    ['some string', 'boolean', true],
    [0, 'boolean', true],
    [1, 'boolean', true],
    [true, 'string', true],
    [false, 'string', true],
    [undefined, 'string', false],
    ['some string', 'string', false],
    [0, 'string', true],
    [1, 'string', true],
    [true, 'number', true],
    [false, 'number', true],
    [undefined, 'number', false],
    ['some string', 'number', true],
    [0, 'number', false],
    [1, 'number', false],
  ])('should for propValue: %s and propType: %s return %s', (propValue, propType, result) => {
    expect(isValueNotOfType(propValue, propType)).toBe(result);
  });
});

describe('validateValueOfType()', () => {
  it('should return undefined if propValue is of the expected type', () => {
    expect(validateValueOfType('propName', 'propValue', 'string')).toBe(undefined);
  });

  it('should return undefined if propValue is undefined', () => {
    expect(validateValueOfType('propName', undefined, 'string')).toBe(undefined);
  });

  it('should return error object if propValue is not of the expected type', () => {
    expect(validateValueOfType('propName', 123, 'string')).toEqual({
      propName: 'propName',
      propValue: 123,
      propType: 'string',
    });
  });
});

describe('getBreakpointCustomizableStructure()', () => {
  it('should return formatted string for boolean type', () => {
    expect(getBreakpointCustomizableStructure('boolean')).toMatchSnapshot();
  });

  it('should return formatted string for number type', () => {
    expect(getBreakpointCustomizableStructure('number')).toMatchSnapshot();
  });

  it('should return formatted string for array type', () => {
    expect(getBreakpointCustomizableStructure(['a', 'b'])).toMatchSnapshot();
  });
});

describe('getAriaStructure()', () => {
  it('should return formatted string for array with single aria attributes', () => {
    expect(getAriaStructure(['aria-label'])).toMatchSnapshot();
  });

  it('should return formatted string for array with multiple aria attributes', () => {
    expect(getAriaStructure(['aria-label', 'aria-disabled', 'aria-pressed'])).toMatchSnapshot();
  });
});

describe('getShapeStructure()', () => {
  it('should return formatted string for object', () => {
    expect(
      getShapeStructure({
        id: AllowedTypes.string,
        active: AllowedTypes.boolean,
        index: AllowedTypes.number,
        direction: AllowedTypes.oneOf(['up', 'down']),
      })
    ).toMatchSnapshot();
  });
});

describe('isBreakpointCustomizableValueInvalid()', () => {
  describe('for boolean', () => {
    it('should return false if value is a boolean', () => {
      expect(isBreakpointCustomizableValueInvalid(true, 'boolean')).toBe(false);
    });

    it('should return true if value is not a boolean', () => {
      expect(isBreakpointCustomizableValueInvalid('true', 'boolean')).toBe(true);
    });
  });

  describe('for number', () => {
    it('should return false if value is a number', () => {
      expect(isBreakpointCustomizableValueInvalid(1, 'number')).toBe(false);
    });

    it('should return true if value is not a number', () => {
      expect(isBreakpointCustomizableValueInvalid('1', 'number')).toBe(true);
    });
  });

  describe('for array', () => {
    const allowedValues = ['a', 'b'];
    it('should return true if value is not in allowedValues', () => {
      expect(isBreakpointCustomizableValueInvalid('c', allowedValues)).toBe(true);
    });

    it('should return false if value is in allowedValues', () => {
      expect(isBreakpointCustomizableValueInvalid('a', allowedValues)).toBe(false);
    });
  });
});

describe('isValidArray()', () => {
  it.each<[string, any, ValidatorFunction, any, string | undefined]>([
    ['propName', ['a'], AllowedTypes.string, undefined, undefined],
    ['propName', [], AllowedTypes.string, undefined, undefined],
    ['propName', [1], AllowedTypes.string, 1, 'string[]'],
    ['propName', 'non array', AllowedTypes.string, 'non array', 'string[]'],
    ['propName', undefined, AllowedTypes.string, undefined, 'string[]'],
    ['propName', [{}], AllowedTypes.string, {}, 'string[]'],
    ['propName', [null], AllowedTypes.string, null, 'string[]'],
    ['propName', [1], AllowedTypes.number, undefined, undefined],
    ['propName', [], AllowedTypes.number, undefined, undefined],
    ['propName', ['a'], AllowedTypes.number, 'a', 'number[]'],
    ['propName', 'non array', AllowedTypes.number, 'non array', 'number[]'],
    ['propName', undefined, AllowedTypes.number, undefined, 'number[]'],
    ['propName', [{}], AllowedTypes.number, {}, 'number[]'],
    ['propName', [null], AllowedTypes.number, null, 'number[]'],
    // AllowedTypes.null: null/undefined are valid items, anything else is not.
    // The previously crashing case is the "non array" row, which now gracefully derives
    // propType via the Symbol fallback because validator(propName, null) returns undefined.
    ['propName', [null], AllowedTypes.null, undefined, undefined],
    ['propName', [null, undefined], AllowedTypes.null, undefined, undefined],
    ['propName', [], AllowedTypes.null, undefined, undefined],
    ['propName', ['a'], AllowedTypes.null, 'a', 'null[]'],
    ['propName', [1], AllowedTypes.null, 1, 'null[]'],
    ['propName', 'non array', AllowedTypes.null, 'non array', 'null[]'],
    ['propName', undefined, AllowedTypes.null, undefined, 'null[]'],
  ])(
    'should for propName: %s, arr: %s and validator: %s return %s',
    (propName, arr, validator, valueResult, typeResult) => {
      expect(isValidArray(propName, arr, validator)).toEqual(
        typeResult
          ? {
              propName,
              propValue: valueResult,
              propType: typeResult,
            }
          : undefined
      );
    }
  );
});

describe('validateProps()', () => {
  const instance = {
    prop1: 'value1',
    prop2: 'value2',
    host: document.createElement('p-button'),
  };

  const validatorFunction1 = vi.fn();
  const validatorFunction2 = vi.fn();
  const validatorFunction3 = vi.fn();

  const propTypes = {
    prop1: validatorFunction1,
    prop2: validatorFunction2,
    prop3: validatorFunction3,
  };

  it('should call validatorFunction with correct parameters for each propType', () => {
    validateProps(instance, propTypes);

    expect(validatorFunction1).toHaveBeenCalledWith('prop1', 'value1');
    expect(validatorFunction2).toHaveBeenCalledWith('prop2', 'value2');
    expect(validatorFunction3).toHaveBeenCalledWith('prop3', undefined);
  });

  it('should print an error for each validation error', () => {
    const consoleErrorSpy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    const error1: ValidationError = { propName: 'prop1', propValue: 'value1', propType: 'string' };
    const error2: ValidationError = { propName: 'prop2', propValue: 'value2', propType: 'string' };

    validatorFunction1.mockReturnValueOnce(error1);
    validatorFunction2.mockReturnValueOnce(error2);

    validateProps(instance, propTypes);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenNthCalledWith(
      1,
      "Invalid property 'prop1' with value 'value1' supplied to p-button, expected one of: string.",
      instance.host
    );
    expect(consoleErrorSpy).toHaveBeenNthCalledWith(
      2,
      "Invalid property 'prop2' with value 'value2' supplied to p-button, expected one of: string.",
      instance.host
    );
  });

  it('should not print an error without validation errors', () => {
    const consoleErrorSpy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    validateProps(instance, propTypes);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});

describe('AllowedTypes', () => {
  describe('.string', () => {
    it.each<[any, ValidationError | undefined]>([
      ['propValue', undefined],
      [undefined, undefined],
      [1, { propName: 'propName', propValue: 1 as any, propType: 'string' }],
      [true, { propName: 'propName', propValue: true as any, propType: 'string' }],
    ])('should for propValue: %s return %s', (propValue, expected) => {
      expect(AllowedTypes.string('propName', propValue)).toEqual(expected);
    });
  });

  describe('.number', () => {
    it.each<[any, ValidationError | undefined]>([
      [1, undefined],
      [undefined, undefined],
      ['propValue', { propName: 'propName', propValue: 'propValue', propType: 'number' }],
      [true, { propName: 'propName', propValue: true as any, propType: 'number' }],
    ])('should for propValue: %s return %s', (propValue, expected) => {
      expect(AllowedTypes.number('propName', propValue)).toEqual(expected);
    });
  });

  describe('.boolean', () => {
    it.each<[any, ValidationError | undefined]>([
      [true, undefined],
      [undefined, undefined],
      ['propValue', { propName: 'propName', propValue: 'propValue', propType: 'boolean' }],
      [1, { propName: 'propName', propValue: 1 as any, propType: 'boolean' }],
    ])('should for propValue: %s return %s', (propValue, expected) => {
      expect(AllowedTypes.boolean('propName', propValue)).toEqual(expected);
    });
  });

  describe('.null', () => {
    it.each<[any, ValidationError | undefined]>([
      [null, undefined],
      [undefined, undefined],
      ['a string', { propName: 'propName', propValue: 'a string', propType: 'null' }],
      [0, { propName: 'propName', propValue: 0 as any, propType: 'null' }],
      [false, { propName: 'propName', propValue: false as any, propType: 'null' }],
      [{}, { propName: 'propName', propValue: {} as any, propType: 'null' }],
      [[], { propName: 'propName', propValue: [] as any, propType: 'null' }],
    ])('should for propValue: %s return %s', (propValue, expected) => {
      expect(AllowedTypes.null('propName', propValue)).toEqual(expected);
    });

    it("should expose function name 'null' for readable oneOf error messages", () => {
      // `func.name` is used by `oneOf` to build the `expected one of: ...` error message.
      // The method-shorthand definition in `validateProps.ts` ensures this is the literal 'null'.
      expect(AllowedTypes.null.name).toBe('null');
    });

    it('should produce a readable error via oneOf when combined with AllowedTypes.string', () => {
      const validator = AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.null]);

      expect(validator('value', 'hello')).toBe(undefined);
      expect(validator('value', null)).toBe(undefined);
      expect(validator('value', undefined)).toBe(undefined);
      expect(validator('value', 42)).toEqual({
        propName: 'value',
        propValue: 42,
        propType: 'string, null',
      });
    });
  });

  describe('.array', () => {
    const validatorFunctionValues = AllowedTypes.array(AllowedTypes.string);

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunctionValues).toEqual(expect.any(Function));
    });

    it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
      const result = validatorFunctionValues('propName', [1]);
      expect(result).toEqual({
        propName: 'propName',
        propValue: 1,
        propType: 'string[]',
      });
    });

    it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array and non array', () => {
      const result = validatorFunctionValues('propName', false);
      expect(result).toEqual({
        propName: 'propName',
        propValue: false,
        propType: 'string[]',
      });
    });

    it('should return undefined via anonymous ValidatorFunction if value is in allowedValues array', () => {
      const result = validatorFunctionValues('propName', ['b']);
      expect(result).toBe(undefined);
    });
  });

  describe('.oneOf', () => {
    describe('for array of values', () => {
      const validatorFunctionValues = AllowedTypes.oneOf(['a', 'b']);

      it('should return anonymous ValidatorFunction', () => {
        expect(validatorFunctionValues).toEqual(expect.any(Function));
      });

      it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
        const result = validatorFunctionValues('propName', 'c');
        expect(result).toEqual({
          propName: 'propName',
          propValue: 'c',
          propType: "['a', 'b']",
        });
      });

      it('should return undefined via anonymous ValidatorFunction if value is in allowedValues array', () => {
        const result = validatorFunctionValues('propName', 'b');
        expect(result).toBe(undefined);
      });
    });

    describe('for array of validator functions', () => {
      const nestedValidatorFunc1 = vi.fn();
      const nestedValidatorFunc2 = vi.fn();
      const nestedValidatorFunc3 = vi.fn();

      const validatorFunctionFunctions = AllowedTypes.oneOf([
        nestedValidatorFunc1,
        nestedValidatorFunc2,
        nestedValidatorFunc3,
      ]);

      const error: ValidationError = {
        propName: 'propName',
        propValue: 'c',
        propType: expect.any(String),
      };

      it('should return anonymous ValidatorFunction', () => {
        expect(validatorFunctionFunctions).toEqual(expect.any(Function));
      });

      it('should call nested validator functions until first one returns undefined via anonymous ValidatorFunction', () => {
        nestedValidatorFunc1.mockReturnValueOnce({ ...error, propType: 'string' });
        nestedValidatorFunc2.mockReturnValueOnce(undefined);
        validatorFunctionFunctions('propName', 'c');
        expect(nestedValidatorFunc1).toHaveBeenCalledWith('propName', 'c');
        expect(nestedValidatorFunc2).toHaveBeenCalledWith('propName', 'c');
        expect(nestedValidatorFunc3).not.toHaveBeenCalled();
      });

      it('should return error object via anonymous ValidatorFunction if value does not pass any nested validator function', () => {
        nestedValidatorFunc1.mockReturnValueOnce({ ...error, propType: 'string' });
        nestedValidatorFunc2.mockReturnValueOnce({ ...error, propType: 'boolean' });
        nestedValidatorFunc3.mockReturnValueOnce({ ...error, propType: 'boolean' });
        const result = validatorFunctionFunctions('propName', 'c');
        expect(result).toEqual(error);
      });

      it('should return undefined via anonymous ValidatorFunction if value does not pass at least one nested validator function', () => {
        nestedValidatorFunc1.mockReturnValueOnce({ ...error, propType: 'number' });
        nestedValidatorFunc2.mockReturnValueOnce({ ...error, propType: 'number' });
        nestedValidatorFunc3.mockReturnValueOnce(undefined);
        const result = validatorFunctionFunctions('propName', 'c');
        expect(result).toBe(undefined);
      });

      it('should return undefined via anonymous ValidatorFunction if value passes all nested validator functions', () => {
        nestedValidatorFunc1.mockReturnValueOnce(undefined);
        nestedValidatorFunc2.mockReturnValueOnce(undefined);
        nestedValidatorFunc3.mockReturnValueOnce(undefined);
        const result = validatorFunctionFunctions('propName', 'b');
        expect(result).toBe(undefined);
      });
    });
  });

  describe('.breakpoint', () => {
    const validatorFunctionArray = AllowedTypes.breakpoint(['a', 'b']);
    const validatorFunctionBoolean = AllowedTypes.breakpoint('boolean');

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunctionArray).toEqual(expect.any(Function));
      expect(validatorFunctionBoolean).toEqual(expect.any(Function));
    });

    it('should call parseJSON() with correct parameters via anonymous ValidatorFunction', () => {
      const spy = vi.spyOn(breakpointCustomizableUtils, 'parseJSON');
      const propValue = { base: 'a', s: 'b' };
      validatorFunctionArray('propName', propValue);
      expect(spy).toHaveBeenCalledWith(propValue);
    });

    it('should call parseJSONBoolean() with correct parameters via anonymous ValidatorFunction', () => {
      const spy = vi.spyOn(breakpointCustomizableUtils, 'parseJSONBoolean');
      validatorFunctionBoolean('propName', { base: true, s: false });
      expect(spy).toHaveBeenCalledWith({ base: true, s: false });
    });

    describe('returns error object', () => {
      const error: ValidationError = {
        propName: 'propName',
        propValue: 'c',
        propType: getBreakpointCustomizableStructure(['a', 'b']),
      };

      it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
        const result1 = validatorFunctionArray('propName', 'c');
        expect(result1).toEqual(error);

        const result2 = validatorFunctionArray('propName', { base: 'a', s: 'c' });
        expect(result2).toEqual({ ...error, propValue: formatObjectOutput({ base: 'a', s: 'c' }) });
      });

      it('should return error object via anonymous ValidatorFunction if value is not boolean', () => {
        const result1 = validatorFunctionBoolean('propName', 'c');
        expect(result1).toEqual({ ...error, propType: getBreakpointCustomizableStructure('boolean') });

        const result2 = validatorFunctionArray('propName', { base: true, s: 'c' });
        expect(result2).toEqual({ ...error, propValue: formatObjectOutput({ base: true, s: 'c' }) });
      });

      it('should return error object with unparsed empty string via anonymous ValidatorFunction for non boolean allowedValues', () => {
        expect(validatorFunctionArray('propName', '')).toEqual({ ...error, propValue: '""' });
      });
    });

    describe('returns undefined', () => {
      it('should return undefined via anonymous ValidatorFunction if value is in allowedValues array', () => {
        const result1 = validatorFunctionArray('propName', 'b');
        expect(result1).toBe(undefined);

        const result2 = validatorFunctionArray('propName', { base: 'a', s: 'b' });
        expect(result2).toBe(undefined);
      });

      it('should return undefined via anonymous ValidatorFunction if value is boolean', () => {
        const result1 = validatorFunctionBoolean('propName', true);
        expect(result1).toBe(undefined);

        const result2 = validatorFunctionBoolean('propName', { base: true, s: false });
        expect(result2).toBe(undefined);
      });

      it('should return undefined via anonymous ValidatorFunction if value is empty string of boolean attribute shorthand', () => {
        expect(validatorFunctionBoolean('propName', '')).toBe(undefined);
      });
    });
  });

  describe('.aria', () => {
    const validatorFunction = AllowedTypes.aria(['aria-label', 'aria-disabled']);

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunction).toEqual(expect.any(Function));
    });

    it('should call parseJSONAttribute() with correct parameters via anonymous ValidatorFunction', () => {
      const spy = vi.spyOn(jsonUtils, 'parseJSONAttribute');
      const propValue = { 'aria-label': 'Some label' };
      validatorFunction('aria', propValue);
      expect(spy).toHaveBeenCalledWith(propValue);
    });

    it('should return error object via anonymous ValidatorFunction if aria keys are not in allowedAriaAttributes array', () => {
      const propValue = { 'aria-label': 'Some label', foo: 'bar' };
      const result = validatorFunction('aria', propValue);
      expect(result).toEqual({
        propName: 'aria',
        propValue: formatObjectOutput(propValue),
        propType: getAriaStructure(['aria-label', 'aria-disabled']),
      });
    });

    it('should return undefined via anonymous ValidatorFunction if aria keys are in allowedAriaAttributes array', () => {
      const result = validatorFunction('aria', { 'aria-label': 'Some label', 'aria-disabled': true });
      expect(result).toBe(undefined);
    });
  });

  describe('.shape', () => {
    const nestedValidatorFunction1 = vi.fn();
    const nestedValidatorFunction2 = vi.fn();
    const shapeStructure = { id: nestedValidatorFunction1, active: nestedValidatorFunction2 };
    const validatorFunction = AllowedTypes.shape(shapeStructure);

    const mockError: ValidationError = {
      propName: 'sort',
      propValue: expect.any(Object),
      propType: expect.any(String),
    };

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunction).toEqual(expect.any(Function));
    });

    it('should call each nested validator function if propValue is defined', () => {
      validatorFunction('sort', { id: '1', active: true });
      expect(nestedValidatorFunction1).toHaveBeenCalledWith('id', '1');
      expect(nestedValidatorFunction2).toHaveBeenCalledWith('active', true);
    });

    it('should not call any nested validator function if propValue is undefined', () => {
      validatorFunction('sort', undefined);
      expect(nestedValidatorFunction1).not.toHaveBeenCalled();
      expect(nestedValidatorFunction2).not.toHaveBeenCalled();
    });

    it('should return error object via anonymous ValidatorFunction if a nested validator function returns an error', () => {
      nestedValidatorFunction2.mockReturnValueOnce({ ...mockError, propName: 'something else' });
      const result = validatorFunction('sort', { id: '1', active: true });
      expect(result).toEqual(mockError);
    });

    it('should return undefined via anonymous ValidatorFunction if propValue is undefined', () => {
      const result = validatorFunction('sort', undefined);
      expect(result).toBe(undefined);
    });

    it('should return undefined via anonymous ValidatorFunction if all nested validator functions pass', () => {
      nestedValidatorFunction1.mockReturnValueOnce(undefined);
      nestedValidatorFunction2.mockReturnValueOnce(undefined);
      const result = validatorFunction('sort', { id: '1', active: true });
      expect(result).toBe(undefined);
    });
  });
});

describe('formatObjectOutput()', () => {
  it('should return formatted string for object', () => {
    expect(
      formatObjectOutput({ id: 1, value: 'string', active: true, 'aria-label': 'label', 'optional?': true })
    ).toMatchSnapshot();
  });

  it('should return formatted string for string', () => {
    expect(formatObjectOutput('string' as any)).toMatchSnapshot();
  });

  it('should return formatted string for boolean', () => {
    expect(formatObjectOutput(true as any)).toMatchSnapshot();
  });
});

describe('formatArrayOutput()', () => {
  it('should return formatted string for array', () => {
    expect(formatArrayOutput(['value1', 'value2', true, 1, undefined])).toMatchSnapshot();
  });
});

describe('printErrorMessage()', () => {
  it('should call consoleError() util with correct parameter', () => {
    const instance = {
      href: 'a',
      host: document.createElement('p-link'),
    };
    const spy = vi.spyOn(loggerUtils, 'consoleError').mockImplementation(() => {});
    printErrorMessage({ propName: 'href', propValue: 'a', propType: 'string', componentName: 'p-link', instance });

    expect(spy).toHaveBeenCalledWith(expect.any(String), instance.host);
    expect(spy.mock.calls[0][0]).toMatchSnapshot();
  });
});
