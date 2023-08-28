import * as validatePropsUtils from './validateProps';
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
  validateProps,
  validateValueOfType,
  ValidationError,
  ValidatorFunction,
} from './validateProps';
import * as loggerUtils from '../log/logger';
import * as breakpointCustomizableUtils from '../breakpoint-customizable';
import * as jsonUtils from '../json';

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
  it('should call isValueNotOfType() with correct parameters', () => {
    const spy = jest.spyOn(validatePropsUtils, 'isValueNotOfType');
    validateValueOfType('propName', 'propValue', 'string');

    expect(spy).toBeCalledWith('propValue', 'string');
  });

  it('should return undefined if isValueNotOfType() is false', () => {
    jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValue(false);
    const result = validateValueOfType('propName', 'propValue', 'string');
    expect(result).toBe(undefined);
  });

  it('should return error object if isValueNotOfType() is true', () => {
    jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValue(true);
    const result = validateValueOfType('propName', 'propValue', 'string');
    expect(result).toEqual({
      propName: 'propName',
      propValue: 'propValue',
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

  it('should call formatArrayOutput() for array type', () => {
    const spy = jest.spyOn(validatePropsUtils, 'formatArrayOutput');
    getBreakpointCustomizableStructure('boolean');
    expect(spy).not.toBeCalled();

    const allowedValues = ['a', 'b'];
    getBreakpointCustomizableStructure(allowedValues);
    expect(spy).toBeCalledWith(allowedValues);
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
    it('should call isValueNotOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isValueNotOfType');
      isBreakpointCustomizableValueInvalid(true, 'boolean');
      expect(spy).toBeCalledWith(true, 'boolean');
    });

    it('should return result of isValueNotOfType()', () => {
      jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValueOnce(true).mockReturnValueOnce(false);
      expect(isBreakpointCustomizableValueInvalid(true, 'boolean')).toBe(true);
      expect(isBreakpointCustomizableValueInvalid(true, 'boolean')).toBe(false);
    });
  });

  describe('for number', () => {
    it('should call isValueNotOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isValueNotOfType');
      isBreakpointCustomizableValueInvalid(true, 'number');
      expect(spy).toBeCalledWith(true, 'number');
    });

    it('should return result of isValueNotOfType()', () => {
      jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValueOnce(true).mockReturnValueOnce(false);
      expect(isBreakpointCustomizableValueInvalid(true, 'number')).toBe(true);
      expect(isBreakpointCustomizableValueInvalid(true, 'number')).toBe(false);
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
    ['propName', 'non array', AllowedTypes.string, 'non array', '[]'],
    ['propName', undefined, AllowedTypes.string, undefined, '[]'],
    ['propName', [{}], AllowedTypes.string, {}, 'string[]'],
    ['propName', [null], AllowedTypes.string, null, 'string[]'],
    ['propName', [1], AllowedTypes.number, undefined, undefined],
    ['propName', [], AllowedTypes.number, undefined, undefined],
    ['propName', ['a'], AllowedTypes.number, 'a', 'number[]'],
    ['propName', 'non array', AllowedTypes.number, 'non array', '[]'],
    ['propName', undefined, AllowedTypes.number, undefined, '[]'],
    ['propName', [{}], AllowedTypes.number, {}, 'number[]'],
    ['propName', [null], AllowedTypes.number, null, 'number[]'],
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

  const validatorFunction1 = jest.fn();
  const validatorFunction2 = jest.fn();
  const validatorFunction3 = jest.fn();

  const propTypes = {
    prop1: validatorFunction1,
    prop2: validatorFunction2,
    prop3: validatorFunction3,
  };

  it('should call validatorFunction with correct parameters for each propType', () => {
    validateProps(instance, propTypes);

    expect(validatorFunction1).toBeCalledWith('prop1', 'value1');
    expect(validatorFunction2).toBeCalledWith('prop2', 'value2');
    expect(validatorFunction3).toBeCalledWith('prop3', undefined);
  });

  it('should call printErrorMessage() for each validation error', () => {
    const spy = jest.spyOn(validatePropsUtils, 'printErrorMessage').mockReturnValue();
    const error1: ValidationError & { componentName: string } = {
      propName: 'prop1',
      propValue: 'value1',
      propType: 'string',
      componentName: 'p-button',
    };
    const error2: ValidationError = { ...error1, propName: 'prop2', propValue: 'value2' };

    validatorFunction1.mockReturnValueOnce(error1);
    validatorFunction2.mockReturnValueOnce(error2);

    validateProps(instance, propTypes);

    expect(spy).toBeCalledTimes(2);
    // other parameters because callback is passed to forEach
    expect(spy).toHaveBeenNthCalledWith(1, error1);
    expect(spy).toHaveBeenNthCalledWith(2, error2);
  });

  it('should not call printErrorMessage() without validation errors', () => {
    const spy = jest.spyOn(validatePropsUtils, 'printErrorMessage');
    validateProps(instance, propTypes);

    expect(spy).not.toBeCalled();
  });
});

describe('AllowedTypes', () => {
  const mockResult: ValidationError = {
    propName: 'href',
    propValue: 'a',
    propType: 'string',
  };

  describe('.string', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.string('propName', 'propValue');
      expect(spy).toBeCalledWith('propName', 'propValue', 'string');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.string('propName', 'propValue');
      expect(result).toEqual(mockResult);
    });
  });

  describe('.number', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.number('propName', 1);
      expect(spy).toBeCalledWith('propName', 1, 'number');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.number('propName', 'propValue');
      expect(result).toEqual(mockResult);
    });
  });

  describe('.boolean', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.boolean('propName', true);
      expect(spy).toBeCalledWith('propName', true, 'boolean');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.boolean('propName', 'propValue');
      expect(result).toEqual(mockResult);
    });
  });

  fdescribe('.array', () => {
    const validatorFunctionValues = AllowedTypes.array(AllowedTypes.string);

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunctionValues).toEqual(expect.any(Function));
    });

    it('should call isValidArray() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isValidArray');
      validatorFunctionValues('propName', ['a', 'b']);
      expect(spy).toBeCalledWith('propName', ['a', 'b'], AllowedTypes.string);
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
        propType: '[]',
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

      it('should call formatArrayOutput() via anonymous ValidatorFunction', () => {
        const spy = jest.spyOn(validatePropsUtils, 'formatArrayOutput');
        validatorFunctionValues('propName', 'c');
        expect(spy).toBeCalledWith(['a', 'b']);
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
      const nestedValidatorFunc1 = jest.fn();
      const nestedValidatorFunc2 = jest.fn();
      const nestedValidatorFunc3 = jest.fn();

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
        expect(nestedValidatorFunc1).toBeCalledWith('propName', 'c');
        expect(nestedValidatorFunc2).toBeCalledWith('propName', 'c');
        expect(nestedValidatorFunc3).not.toBeCalled();
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
      const spy = jest.spyOn(breakpointCustomizableUtils, 'parseJSON');
      const propValue = { base: 'a', s: 'b' };
      validatorFunctionArray('propName', propValue);
      expect(spy).toBeCalledWith(propValue);
    });

    it('should call isBreakpointCustomizableValueInvalid() with correct parameters for flat value via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isBreakpointCustomizableValueInvalid');
      validatorFunctionArray('propName', 'a');
      expect(spy).toBeCalledWith('a', ['a', 'b']);
    });

    it('should call isBreakpointCustomizableValueInvalid() with correct parameters for nested values via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isBreakpointCustomizableValueInvalid');
      const propValue = { base: 'a', s: 'b' };
      validatorFunctionArray('propName', propValue);
      expect(spy).toBeCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'a', ['a', 'b']);
      expect(spy).toHaveBeenNthCalledWith(2, 'b', ['a', 'b']);
    });

    it('should call getBreakpointCustomizableStructure() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'getBreakpointCustomizableStructure');
      validatorFunctionArray('propName', 'c');
      expect(spy).toBeCalledWith(['a', 'b']);
    });

    it('should call formatObjectOutput() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'formatObjectOutput');
      validatorFunctionArray('propName', 'c');
      expect(spy).toBeCalledWith('c');
    });

    describe('returns error object', () => {
      const error: ValidationError = {
        propName: 'propName',
        propValue: 'c',
        propType: expect.any(String),
      };

      it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
        const result1 = validatorFunctionArray('propName', 'c');
        expect(result1).toEqual(error);

        jest.spyOn(validatePropsUtils, 'formatObjectOutput').mockReturnValue('formattedValue');
        const result2 = validatorFunctionArray('propName', { base: 'a', s: 'c' });
        expect(result2).toEqual({ ...error, propValue: 'formattedValue' });
      });

      it('should return error object via anonymous ValidatorFunction if value is not boolean', () => {
        const result1 = validatorFunctionBoolean('propName', 'c');
        expect(result1).toEqual(error);

        jest.spyOn(validatePropsUtils, 'formatObjectOutput').mockReturnValue('formattedValue');
        const result2 = validatorFunctionArray('propName', { base: true, s: 'c' });
        expect(result2).toEqual({ ...error, propValue: 'formattedValue' });
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
    });
  });

  describe('.aria', () => {
    const validatorFunction = AllowedTypes.aria(['aria-label', 'aria-disabled']);
    const mockResult = { 'aria-pressed': 'Some label' };

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunction).toEqual(expect.any(Function));
    });

    it('should call parseJSONAttribute() with correct parameters via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute');
      const propValue = { 'aria-label': 'Some label' };
      validatorFunction('aria', propValue);
      expect(spy).toBeCalledWith(propValue);
    });

    it('should call formatObjectOutput() with result of parseJSONAttribute() via anonymous ValidatorFunction', () => {
      jest.spyOn(jsonUtils, 'parseJSONAttribute').mockReturnValue(mockResult);
      const spy = jest.spyOn(validatePropsUtils, 'formatObjectOutput');
      validatorFunction('aria', 'propValue');

      expect(spy).toBeCalledWith(mockResult);
    });

    it('should call getAriaStructure() with correct parameters via anonymous ValidatorFunction', () => {
      jest.spyOn(jsonUtils, 'parseJSONAttribute').mockReturnValue(mockResult);
      const spy = jest.spyOn(validatePropsUtils, 'getAriaStructure');
      validatorFunction('aria', 'propValue');

      expect(spy).toBeCalledWith(['aria-label', 'aria-disabled']);
    });

    it('should return error object via anonymous ValidatorFunction if aria keys are not in allowedAriaAttributes array', () => {
      const error: ValidationError = {
        propName: 'aria',
        propValue: expect.any(String),
        propType: expect.any(String),
      };
      const result = validatorFunction('aria', { 'aria-label': 'Some label', foo: 'bar' });
      expect(result).toEqual(error);
    });

    it('should return undefined via anonymous ValidatorFunction if aria keys are in allowedAriaAttributes array', () => {
      const result = validatorFunction('aria', { 'aria-label': 'Some label', 'aria-disabled': true });
      expect(result).toBe(undefined);
    });
  });

  describe('.shape', () => {
    const nestedValidatorFunction1 = jest.fn();
    const nestedValidatorFunction2 = jest.fn();
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
      expect(nestedValidatorFunction1).toBeCalledWith('id', '1');
      expect(nestedValidatorFunction2).toBeCalledWith('active', true);
    });

    it('should not call any nested validator function if propValue is undefined', () => {
      validatorFunction('sort', undefined);
      expect(nestedValidatorFunction1).not.toBeCalled();
      expect(nestedValidatorFunction2).not.toBeCalled();
    });

    it('should call getShapeStructure() with correct parameter', () => {
      const spy = jest.spyOn(validatePropsUtils, 'getShapeStructure');
      nestedValidatorFunction1.mockReturnValueOnce(mockError);
      validatorFunction('sort', { id: '1' });
      expect(spy).toBeCalledWith(shapeStructure);
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
    const spy = jest.spyOn(loggerUtils, 'consoleError').mockImplementation();
    printErrorMessage({ propName: 'href', propValue: 'a', propType: 'string', componentName: 'p-link' });

    expect(spy).toBeCalledWith(expect.any(String));
    expect(spy.mock.calls[0][0]).toMatchSnapshot();
  });
});
