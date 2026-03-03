import { type Breakpoint, breakpoints } from '@porsche-design-system/emotion';
import type { AriaAttributes, Class, FunctionPropertyNames } from '../../types';
import { consoleError, getTagNameWithoutPrefix } from '..';
import { type BreakpointValues, parseJSON } from '../breakpoint-customizable';
import { parseJSONAttribute } from '../json';

export type ValidatorFunction = (propName: string, propValue: any) => ValidationError;
type ValidatorFunctionArrayCreator = (allowedType: ValidatorFunction) => ValidatorFunction;
type ValidatorFunctionOneOfCreator = <T>(allowedValues: T[] | readonly T[]) => ValidatorFunction;
type ValidatorFunctionBreakpointCustomizableCreator = <T>(
  allowedValues: Exclude<AllowedTypeKey, 'string'> | T[] | readonly T[]
) => ValidatorFunction;
type ValidatorFunctionShapeCreator = <T>(
  allowedValues: {
    [key in keyof T]: ValidatorFunctionOrCreator;
  }
) => ValidatorFunction;
type ValidatorFunctionOrCreator =
  | ValidatorFunction
  | ValidatorFunctionOneOfCreator
  | ValidatorFunctionBreakpointCustomizableCreator
  | ValidatorFunctionShapeCreator;

export type ValidationError = {
  propName: string;
  propValue: string;
  propType: string;
};

export const formatObjectOutput = (value: any): string => {
  return JSON.stringify(value)
    .replace(/"([a-zA-Z?]+)":/g, '$1:') // remove double quotes from keys
    .replace(/([,:{])/g, '$1 ') // add space after following: ,:{
    .replace(/(})/g, ' $1') // add space before following: }
    .replace(/^"(.+)"$/, '$1'); // remove wrapping double quotes
};

export const formatArrayOutput = <T>(value: T[] | readonly T[]): string => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    JSON.stringify(value.map((x) => (x === undefined ? `${x}` : x))) // wrap undefined in quotes to not convert it to null
      .replace(/'/g, '') // remove single quotes
      // eslint-disable-next-line @typescript-eslint/quotes
      .replace(/"/g, "'") // replace double quotes with single quotes
      .replace(/'(undefined)'/, '$1') // remove quotes around undefined
      .replace(/,/g, ', ') // add space after comma
  );
};

export const printErrorMessage = ({
  propName,
  propValue, // TODO: might be nicer if this is always a string
  propType,
  componentName,
  instance,
}: ValidationError & { componentName: string; instance: any }): void => {
  consoleError(
    `Invalid property '${propName}' with value '${internalValidateProps.formatObjectOutput(
      propValue
    )}' supplied to ${componentName}, expected one of: ${propType}.`,
    instance.host
  );
};

export const isValueNotOfType = (propValue: any, propType: string): boolean => {
  return propValue !== undefined && typeof propValue !== propType;
};

export const validateValueOfType = (
  propName: string,
  propValue: any,
  propType: string
): ValidationError | undefined => {
  if (internalValidateProps.isValueNotOfType(propValue, propType)) {
    return { propName, propValue, propType };
  }
  return undefined;
};

export const getBreakpointCustomizableStructure = <T>(
  allowedValues: Exclude<AllowedTypeKey, 'string'> | T[] | readonly T[]
): string => {
  return breakpointCustomizableTemplate.replace(
    /value/g,
    allowedValues !== 'boolean' && allowedValues !== 'number'
      ? (internalValidateProps
          .formatArrayOutput(allowedValues)
          .replace(/\[/g, '(') // starting inline type literal array
          .replace(/]/g, ')[]') // ending inline type literal array
          .replace(/,/g, ' |') as any) // replace commas with a pipe
      : (allowedValues as string)
  );
};

export const getAriaStructure = <T>(allowedAriaAttributes: readonly T[]): string => {
  return (
    internalValidateProps
      .formatObjectOutput(
        allowedAriaAttributes.reduce(
          (prev, key) => ({
            ...prev,
            [key as any]: 'value',
          }),
          {}
        )
      )
      .replace(/":/g, '"?:') // add optional modifier on keys before colon
      // eslint-disable-next-line @typescript-eslint/quotes
      .replace(/"/g, "'") // replace double quotes with single quotes
  );
};

export const getShapeStructure = <T>(shapeStructure: { [key in keyof T]: ValidatorFunction }): string => {
  return internalValidateProps
    .formatObjectOutput(
      Object.keys(shapeStructure).reduce(
        (prev, key) => ({ ...prev, [key]: shapeStructure[key as keyof { [key in keyof T]: ValidatorFunction }].name }),
        {}
      )
    )
    .replace(/"/g, ''); // remove double quotes
};

export const isBreakpointCustomizableValueInvalid = <T>(
  value: any,
  allowedValues: Exclude<AllowedTypeKey, 'string'> | T[] | readonly T[]
): boolean => {
  return allowedValues === 'boolean' || allowedValues === 'number'
    ? internalValidateProps.isValueNotOfType(value, allowedValues)
    : !allowedValues.includes(value as T);
};

type AllowedTypeKey = 'string' | 'number' | 'boolean';

// TODO: maybe dissolve object structure and have standalone utils

export const AllowedTypes: {
  [key in AllowedTypeKey]: ValidatorFunction;
} & {
  array: ValidatorFunctionArrayCreator;
  oneOf: ValidatorFunctionOneOfCreator;
  aria: ValidatorFunctionOneOfCreator;
  breakpoint: ValidatorFunctionBreakpointCustomizableCreator;
  shape: ValidatorFunctionShapeCreator;
} = {
  // eslint-disable-next-line id-blacklist
  string: (...args) => internalValidateProps.validateValueOfType(...args, 'string'),
  // eslint-disable-next-line id-blacklist
  number: (...args) => internalValidateProps.validateValueOfType(...args, 'number'),
  // eslint-disable-next-line id-blacklist
  boolean: (...args) => internalValidateProps.validateValueOfType(...args, 'boolean'),
  array: (allowedType: ValidatorFunction): ValidatorFunction =>
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function array(propName, propValue) {
      return internalValidateProps.isValidArray(propName, propValue, allowedType);
    },
  oneOf: <T>(allowedValuesOrValidatorFunctions: T[]): ValidatorFunction =>
    // @ts-expect-error: Not all code paths return a value
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function oneOf(propName, propValue) {
      // use first item to determine if we've got primitive types or validator functions
      if (typeof allowedValuesOrValidatorFunctions[0] !== 'function') {
        if (!allowedValuesOrValidatorFunctions.includes(propValue as T)) {
          return {
            propName,
            propValue,
            propType: internalValidateProps.formatArrayOutput(allowedValuesOrValidatorFunctions),
          };
        }
      } else if (
        !allowedValuesOrValidatorFunctions.some(
          (func) => (func as unknown as ValidatorFunction)(propName, propValue) === undefined
        )
      ) {
        return {
          propName,
          propValue,
          propType: allowedValuesOrValidatorFunctions.map((func) => (func as any).name).join(', '),
        };
      }
    },
  breakpoint: (allowedValues): ValidatorFunction =>
    // @ts-expect-error: Not all code paths return a value
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function breakpoint(propName, propValue) {
      // TODO: do parseJSON once in the component, currently it is happening multiple times in a single lifecycle
      const value = parseJSON(propValue as BreakpointValues<any>);
      let isInvalid = false;

      if (typeof value === 'object') {
        if (
          // check structure keys: base, xs, s, m, l, xl
          // TODO: check for base key
          Object.keys(value).some((key) => !breakpoints.includes(key as Breakpoint)) ||
          // check actual values of keys, e.g. true, false, 'small' or 5
          Object.values(value).some((val) =>
            internalValidateProps.isBreakpointCustomizableValueInvalid(val, allowedValues)
          )
        ) {
          isInvalid = true;
        }
      } else if (internalValidateProps.isBreakpointCustomizableValueInvalid(value, allowedValues)) {
        // single flat value like true, false, 'small' or 5, not breakpoint customizable object
        isInvalid = true;
      }

      if (isInvalid) {
        return {
          propName,
          propValue: internalValidateProps.formatObjectOutput(value),
          propType: internalValidateProps.getBreakpointCustomizableStructure(allowedValues),
        };
      }
    },
  aria: <T = keyof AriaAttributes>(allowedAriaAttributes: readonly T[]): ValidatorFunction =>
    // @ts-expect-error: Not all code paths return a value
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function aria(propName, propValue) {
      const ariaAttributes = parseJSONAttribute<AriaAttributes>(propValue as string);
      if (
        ariaAttributes &&
        Object.keys(ariaAttributes).some((ariaKey) => !allowedAriaAttributes.includes(ariaKey as unknown as T))
      ) {
        return {
          propName,
          propValue: internalValidateProps.formatObjectOutput(ariaAttributes),
          propType: internalValidateProps.getAriaStructure(allowedAriaAttributes),
        };
      }
    },
  shape: <T>(shapeStructure: { [key in keyof T]: ValidatorFunction }): ValidatorFunction =>
    // @ts-expect-error: Not all code paths return a value
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function shape(propName, propValue) {
      if (propValue) {
        // const propValueKeys = Object.keys(propValue);
        if (
          // check structure, but propValue could contain additional keys
          // but how to handle optional keys like in table-head-cell's sort property?
          // Object.keys(shapeStructure).some((key) => !propValueKeys.includes(key)) ||
          // check values
          Object.entries(shapeStructure).some(([structureKey, validatorFunc]: [string, ValidatorFunction]) =>
            validatorFunc(structureKey, propValue[structureKey])
          )
        ) {
          // TODO: more precise inner errors from value validation could be output
          return {
            propName,
            propValue, // TODO: convert to string?
            propType: internalValidateProps.getShapeStructure(shapeStructure),
          };
        }
      }
    },
};

// utility type to retrieve all props based on a class
export type PropTypes<T extends Class<any>> = Required<{
  [Property in keyof Omit<
    InstanceType<T>,
    'host' | FunctionPropertyNames<InstanceType<T>>
  >]: ValidatorFunctionOrCreator;
}>;

export const validateProps = <T extends Class<any>>(instance: InstanceType<T>, propTypes: PropTypes<T>): void => {
  for (const error of Object.entries(propTypes)
    .map(([propKey, validatorFunc]: [string, ValidatorFunction]) => validatorFunc(propKey, instance[propKey]))
    .filter((x) => x)) {
    internalValidateProps.printErrorMessage({
      ...error,
      componentName: getTagNameWithoutPrefix(instance.host as HTMLElement),
      instance,
    });
  }
};

/**
 * Validates an array using a provided validator function and returns the first encountered validation error.
 *
 * @param {string} propName - The name of the property being validated.
 * @param {any} arr - The input to be validated.
 * @param {ValidatorFunction} validator - The validator function that checks each array item.
 * @returns {ValidationError | undefined} The first encountered validation error object, or undefined if the array is valid.
 */
export const isValidArray = (propName: string, arr: any, validator: ValidatorFunction): ValidationError => {
  const validationError = Array.isArray(arr)
    ? validator(
        propName,
        arr.find((item) => validator(propName, item))
      )
    : {
        propName,
        propValue: arr,
        propType: validator(propName, null).propType, // Get propType by passing in null which will always result in error
      };

  if (validationError) {
    return { ...validationError, propType: `${validationError.propType}[]` };
  }
  return undefined;
};

export const internalValidateProps = {
  isValueNotOfType,
  formatArrayOutput,
  formatObjectOutput,
  printErrorMessage,
  validateValueOfType,
  isValidArray,
  isBreakpointCustomizableValueInvalid,
  getBreakpointCustomizableStructure,
  getAriaStructure,
  getShapeStructure,
};

const breakpointCustomizableTemplate = `value, ${internalValidateProps
  .formatObjectOutput(
    breakpoints.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})
  )
  .replace(/"/g, '')}`;
