import * as validatePropsUtils from './validateProps';
import { AllowedTypes, isValueNotOfType, validateValueOfType, ValidationError } from './validateProps';

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

xdescribe('getBreakpointCustomizableStructure()', () => {});

xdescribe('getAriaStructure()', () => {});

xdescribe('getShapeStructure()', () => {});

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

  xdescribe('.oneOf', () => {});

  xdescribe('.breakpoint', () => {});

  xdescribe('.aria', () => {});

  xdescribe('.shape', () => {});
});
