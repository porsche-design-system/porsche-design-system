import { BreakpointKey, BREAKPOINTS, BreakpointValues, parseJSON } from '../breakpoint-customizable';
import type { AriaAttributes } from '../../aria-types';
import { parseJSONAttribute } from '../json';
import type { EventEmitter } from '@stencil/core';
import { getTagName } from '../tag-name';

export type ValidatorFunction = (propName: string, propValue: any) => ValidationError;
type ValidatorFunctionOneOfCreator = <T>(allowedValues: T[] | readonly T[]) => ValidatorFunction;
type ValidatorFunctionBreakpointCustomizableCreator = <T>(
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
) => ValidatorFunction;
type ValidatorFunctionShapeCreator = <T>(allowedValues: {
  [key in keyof T]: ValidatorFunctionOrCreator;
}) => ValidatorFunction;
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
    .replace(/"([A-z?]+)":/g, '$1:') // remove double quotes from keys
    .replace(/([,:{])/g, '$1 ') // add space after following: ,:{
    .replace(/(})/g, ' $1') // add space before following: }
    .replace(/^"(.+)"$/, '$1'); // remove wrapping double quotes
};

export const formatArrayOutput = <T>(value: T[] | readonly T[]): string => {
  return (
    JSON.stringify(value)
      .replace(/'/g, '') // remove single quotes
      // eslint-disable-next-line @typescript-eslint/quotes
      .replace(/"/g, "'") // replace double quotes with single quotes
      .replace(/,/g, ', ') // add space after comma
  );
};

export const printErrorMessage = ({
  propName,
  propValue, // TODO: might be nicer if this is always a string
  propType,
  componentName,
}: ValidationError & { componentName: string }): void => {
  console.error(
    `Warning: Invalid property '${propName}' with value '${formatObjectOutput(
      propValue
    )}' supplied to '${componentName}', expected one of: ${propType}`
  );
};

export const isValueNotOfType = (propValue: any, propType: string): boolean => {
  return propValue !== undefined && typeof propValue !== propType;
};

export const validateValueOfType = (propName: string, propValue: any, propType: string): ValidationError => {
  if (isValueNotOfType(propValue, propType)) {
    return { propName, propValue, propType };
  }
};

const breakpointCustomizableTemplate =
  'value, ' +
  formatObjectOutput(
    BREAKPOINTS.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})
  ).replace(/"/g, '');

export const getBreakpointCustomizableStructure = <T>(
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
): string => {
  if (allowedValues !== 'boolean') {
    allowedValues = formatArrayOutput(allowedValues)
      .replace('[', '(') // starting inline type literal array
      .replace(']', ')[]') // ending inline type literal array
      .replace(/,/g, ' |') as any; // replace commas with a pipe
  }
  return breakpointCustomizableTemplate.replace(/value/g, allowedValues as string);
};

export const getAriaStructure = <T>(allowedAriaAttributes: readonly T[]): string => {
  return (
    formatObjectOutput(
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
  return formatObjectOutput(
    Object.keys(shapeStructure).reduce((prev, key) => ({ ...prev, [key]: shapeStructure[key].name }), {})
  ).replace(/"/g, ''); // remove double quotes
};

export const isBreakpointCustomizableValueInvalid = <T>(
  value: any,
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
): boolean => {
  return allowedValues === 'boolean' ? isValueNotOfType(value, allowedValues) : !allowedValues.includes(value as T);
};

type AllowedTypesKeys = 'string' | 'number' | 'boolean';

// TODO: maybe dissolve object structure and have standalone utils
export const AllowedTypes: {
  [key in AllowedTypesKeys]: ValidatorFunction;
} & {
  oneOf: ValidatorFunctionOneOfCreator;
  aria: ValidatorFunctionOneOfCreator;
  breakpoint: ValidatorFunctionBreakpointCustomizableCreator;
  shape: ValidatorFunctionShapeCreator;
} = {
  // eslint-disable-next-line id-blacklist
  string: (...args) => validateValueOfType(...args, 'string'),
  // eslint-disable-next-line id-blacklist
  number: (...args) => validateValueOfType(...args, 'number'),
  // eslint-disable-next-line id-blacklist
  boolean: (...args) => validateValueOfType(...args, 'boolean'),
  oneOf: <T>(allowedValuesOrValidatorFunctions: T[]): ValidatorFunction =>
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function oneOf(propName, propValue) {
      // use first item to determine if we've got primitive types or validator functions
      if (typeof allowedValuesOrValidatorFunctions[0] !== 'function') {
        if (!allowedValuesOrValidatorFunctions.includes(propValue as T)) {
          return { propName, propValue, propType: formatArrayOutput(allowedValuesOrValidatorFunctions) };
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
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function breakpoint(propName, propValue) {
      const value = parseJSON(propValue as BreakpointValues<any>);
      let isInvalid = false;

      if (typeof value === 'object') {
        if (
          // check structure keys: base, xs, s, m, l, xl
          // TODO: check for base key
          Object.keys(value).some((key) => !BREAKPOINTS.includes(key as BreakpointKey)) ||
          // check actual values of keys, e.g. true, false, 'small' or 5
          Object.values(value).some((val) => isBreakpointCustomizableValueInvalid(val, allowedValues))
        ) {
          isInvalid = true;
        }
      } else if (isBreakpointCustomizableValueInvalid(value, allowedValues)) {
        // single flat value like true, false, 'small' or 5, not breakpoint customizable object
        isInvalid = true;
      }

      if (isInvalid) {
        return {
          propName,
          propValue: formatObjectOutput(value),
          propType: getBreakpointCustomizableStructure(allowedValues),
        };
      }
    },
  aria: <T = keyof AriaAttributes>(allowedAriaAttributes: readonly T[]): ValidatorFunction =>
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function aria(propName, propValue) {
      const ariaAttributes = parseJSONAttribute<AriaAttributes>(propValue as string);
      if (
        ariaAttributes &&
        Object.keys(ariaAttributes).some((ariaKey) => !allowedAriaAttributes.includes(ariaKey as unknown as T))
      ) {
        return {
          propName,
          propValue: formatObjectOutput(ariaAttributes),
          propType: getAriaStructure(allowedAriaAttributes),
        };
      }
    },
  shape: <T>(shapeStructure: { [key in keyof T]: ValidatorFunction }): ValidatorFunction =>
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function shape(propName, propValue) {
      const value = parseJSONAttribute(propValue);
      if (value) {
        // const propValueKeys = Object.keys(propValue);
        if (
          // check structure, but propValue could contain additional keys
          // but how to handle optional keys like in table-head-cell's sort property?
          // Object.keys(shapeStructure).some((key) => !propValueKeys.includes(key)) ||
          // check values
          Object.entries(shapeStructure).some(([structureKey, validatorFunc]: [string, ValidatorFunction]) => {
            if (structureKey in value) {
              return validatorFunc(structureKey, value[structureKey]);
            } else {
              return true;
            }
          })
        ) {
          // TODO: more precise inner errors from value validation could be output
          return {
            propName,
            propValue, // TODO: convert to string?
            propType: getShapeStructure(shapeStructure),
          };
        }
      }
    },
};

// utility type to return public properties of generic type that are not a function or EventEmitter
type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function | EventEmitter ? K : never; // or make `@Event` decorators private maybe?
}[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
type Class<T> = Function & {
  new (...args: any[]): T; // eslint-disable-line @typescript-eslint/prefer-function-type
};

// utility type to retrieve all props based on a class
export type PropTypes<T extends Class<any>> = Required<{
  [Property in keyof Omit<
    InstanceType<T>,
    'host' | FunctionPropertyNames<InstanceType<T>>
  >]: ValidatorFunctionOrCreator;
}>;

export const validateProps = <T extends Class<any>>(instance: InstanceType<T>, propTypes: PropTypes<T>): void => {
  Object.entries(propTypes)
    .map(([propKey, validatorFunc]: [string, ValidatorFunction]) => validatorFunc(propKey, instance[propKey]))
    .filter((x) => x)
    .forEach((error) => printErrorMessage({ ...error, componentName: getTagName(instance.host as HTMLElement) }));
};
