import * as validatePropsUtils from './validateProps';
import { isValueNotOfType, validateValueOfType } from './validateProps';

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
  it('should call isValueNotOfType() with correct paramters', () => {
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

xdescribe('AllowedTypes', () => {
  describe('.string', () => {});
  describe('.number', () => {});
  describe('.boolean', () => {});
  describe('.oneOf', () => {});
  describe('.breakpoint', () => {});
  describe('.aria', () => {});
  describe('.shape', () => {});
});
