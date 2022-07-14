import * as validatePropsUtils from './validateProps';
import * as breakpointCustomizableUtils from '../breakpoint-customizable';
import {
  AllowedTypes,
  getAriaStructure,
  getBreakpointCustomizableStructure,
  getShapeStructure,
  isValueNotOfType,
  validateValueOfType,
  ValidationError,
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
  it('should call isValueNotOfType() with correct parameters', () => {
    const spy = jest.spyOn(validatePropsUtils, 'isValueNotOfType');
    validateValueOfType('propName', 'propValue', 'p-button', 'string');

    expect(spy).toBeCalledWith('propValue', 'string');
  });

  it('should return undefined if isValueNotOfType() is false', () => {
    jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValue(false);
    const result = validateValueOfType('propName', 'propValue', 'p-button', 'string');
    expect(result).toBe(undefined);
  });

  it('should return error object if isValueNotOfType() is true', () => {
    jest.spyOn(validatePropsUtils, 'isValueNotOfType').mockReturnValue(true);
    const result = validateValueOfType('propName', 'propValue', 'p-button', 'string');
    expect(result).toEqual({
      propName: 'propName',
      propValue: 'propValue',
      componentName: 'p-button',
      propType: 'string',
    });
  });
});

describe('getBreakpointCustomizableStructure()', () => {
  it('should return formatted string for boolean type', () => {
    expect(getBreakpointCustomizableStructure('boolean')).toMatchSnapshot();
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

xdescribe('isBreakpointCustomizableValueInvalid()', () => {});

xdescribe('validateProps()', () => {});

describe('AllowedTypes', () => {
  const mockResult: ValidationError = {
    propName: 'href',
    propValue: 'a',
    propType: 'string',
    componentName: 'p-link',
  };

  describe('.string', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.string('propName', 'propValue', 'p-button');
      expect(spy).toBeCalledWith('propName', 'propValue', 'p-button', 'string');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.string('propName', 'propValue', 'p-button');
      expect(result).toEqual(mockResult);
    });
  });

  describe('.number', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.number('propName', 1, 'p-button');
      expect(spy).toBeCalledWith('propName', 1, 'p-button', 'number');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.number('propName', 'propValue', 'p-button');
      expect(result).toEqual(mockResult);
    });
  });

  describe('.boolean', () => {
    it('should call validateValueOfType() with correct parameters', () => {
      const spy = jest.spyOn(validatePropsUtils, 'validateValueOfType');
      AllowedTypes.boolean('propName', true, 'p-button');
      expect(spy).toBeCalledWith('propName', true, 'p-button', 'boolean');
    });

    it('should return result of validateValueOfType()', () => {
      jest.spyOn(validatePropsUtils, 'validateValueOfType').mockReturnValue(mockResult);
      const result = AllowedTypes.boolean('propName', 'propValue', 'p-button');
      expect(result).toEqual(mockResult);
    });
  });

  describe('.oneOf', () => {
    const validatorFunction = AllowedTypes.oneOf(['a', 'b']);

    it('should return anonymous ValidatorFunction', () => {
      expect(validatorFunction).toEqual(expect.any(Function));
    });

    it('should call formatArrayOutput() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'formatArrayOutput');
      validatorFunction('propName', 'c', 'p-button');
      expect(spy).toBeCalledWith(['a', 'b']);
    });

    it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
      const result = validatorFunction('propName', 'c', 'p-button');
      expect(result).toMatchObject({
        propName: 'propName',
        propValue: 'c',
        componentName: 'p-button',
        propType: "['a', 'b']",
      });
    });

    it('should return undefined via anonymous ValidatorFunction if value is in allowedValues array', () => {
      const result = validatorFunction('propName', 'b', 'p-button');
      expect(result).toBe(undefined);
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
      validatorFunctionArray('propName', propValue, 'p-button');
      expect(spy).toBeCalledWith(propValue);
    });

    it('should call isBreakpointCustomizableValueInvalid() with correct parameters for flat value via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isBreakpointCustomizableValueInvalid');
      validatorFunctionArray('propName', 'a', 'p-button');
      expect(spy).toBeCalledWith('a', ['a', 'b']);
    });

    it('should call isBreakpointCustomizableValueInvalid() with correct parameters for nested values via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'isBreakpointCustomizableValueInvalid');
      const propValue = { base: 'a', s: 'b' };
      validatorFunctionArray('propName', propValue, 'p-button');
      expect(spy).toBeCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, 'a', ['a', 'b']);
      expect(spy).toHaveBeenNthCalledWith(2, 'b', ['a', 'b']);
    });

    it('should call getBreakpointCustomizableStructure() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'getBreakpointCustomizableStructure');
      validatorFunctionArray('propName', 'c', 'p-button');
      expect(spy).toBeCalledWith(['a', 'b']);
    });

    it('should call formatObjectOutput() via anonymous ValidatorFunction', () => {
      const spy = jest.spyOn(validatePropsUtils, 'formatObjectOutput');
      validatorFunctionArray('propName', 'c', 'p-button');
      expect(spy).toBeCalledWith('c');
    });

    describe('returns error object', () => {
      const error = {
        propName: 'propName',
        propValue: 'c',
        componentName: 'p-button',
        propType: expect.any(String),
      };

      it('should return error object via anonymous ValidatorFunction if value is not in allowedValues array', () => {
        const result1 = validatorFunctionArray('propName', 'c', 'p-button');
        expect(result1).toEqual(error);

        jest.spyOn(validatePropsUtils, 'formatObjectOutput').mockReturnValue('formattedValue');
        const result2 = validatorFunctionArray('propName', { base: 'a', s: 'c' }, 'p-button');
        expect(result2).toEqual({ ...error, propValue: 'formattedValue' });
      });

      it('should return error object via anonymous ValidatorFunction if value is not boolean', () => {
        const result1 = validatorFunctionBoolean('propName', 'c', 'p-button');
        expect(result1).toEqual(error);

        jest.spyOn(validatePropsUtils, 'formatObjectOutput').mockReturnValue('formattedValue');
        const result2 = validatorFunctionArray('propName', { base: true, s: 'c' }, 'p-button');
        expect(result2).toEqual({ ...error, propValue: 'formattedValue' });
      });
    });

    describe('returns undefined', () => {
      it('should return undefined via anonymous ValidatorFunction if value is in allowedValues array', () => {
        const result1 = validatorFunctionArray('propName', 'b', 'p-button');
        expect(result1).toBe(undefined);

        const result2 = validatorFunctionArray('propName', { base: 'a', s: 'b' }, 'p-button');
        expect(result2).toBe(undefined);
      });

      it('should return undefined via anonymous ValidatorFunction if value is boolean', () => {
        const result1 = validatorFunctionBoolean('propName', true, 'p-button');
        expect(result1).toBe(undefined);

        const result2 = validatorFunctionBoolean('propName', { base: true, s: false }, 'p-button');
        expect(result2).toBe(undefined);
      });
    });
  });

  xdescribe('.aria', () => {});

  xdescribe('.shape', () => {});
});

xdescribe('formatObjectOutput()', () => {});

xdescribe('formatArrayOutput()', () => {});

xdescribe('printErrorMessage()', () => {});
