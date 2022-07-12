import { BREAKPOINTS, parseJSON } from '../breakpoint-customizable';
import { AriaAttributes } from '../../aria-types';
import { parseJSONAttribute } from '../json';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Class<T> = Function & {
  new (...args: any[]): T;
};

type ValidatorFunction = (propName: string, propValue: any, componentName: string) => void;
type ValidatorFunctionCreator = <T>(
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
) => ValidatorFunction;
type ValidatorFunctionOrCreator = ValidatorFunction | ValidatorFunctionCreator;

const formatObjectOutput = (value: object): string => {
  return JSON.stringify(value)
    .replace(/"([A-z?]+)":/g, '$1:')
    .replace(/([,:{])/g, '$1 ')
    .replace(/(})/g, ' $1')
    .replace(/^"(.+)"$/, '$1');
};

const formatArrayOutput = <T>(value: T[] | readonly T[]): string => {
  return JSON.stringify(value).replace(/'/g, '').replace(/"/g, "'").replace(/,/g, ', ');
};

const printError = (propName: string, propValue: any, componentName: string, propType: string): void => {
  propValue = formatObjectOutput(propValue);
  console.error(
    `Warning: Invalid property '${propName}' of value '${propValue}' supplied to '${componentName}', expected one of: ${propType}`
  );
};

const isValueNotOfType = (propValue: any, propType: string): boolean => {
  return propValue !== undefined && typeof propValue !== propType;
};

const validateValueOfType = (propName: string, propValue: any, componentName: string, propType: string): void => {
  if (isValueNotOfType(propValue, propType)) {
    printError(propName, propValue, componentName, propType);
  }
};

const breakpointCustomizableTemplate =
  'value, ' +
  formatObjectOutput(
    BREAKPOINTS.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})
  ).replace(/"/g, '');

const getBreakpointCustomizableStructureForType = <T>(
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
): string => {
  if (allowedValues !== 'boolean') {
    allowedValues = formatArrayOutput(allowedValues).replace('[', '(').replace(']', ')[]').replace(/,/g, ' |') as any;
  }
  return breakpointCustomizableTemplate.replace(/value/g, allowedValues as string);
};

const isBreakpointCustomizableValueInvalid = <T>(
  value: any,
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
): boolean => {
  return allowedValues === 'boolean' ? isValueNotOfType(value, allowedValues) : !allowedValues.includes(value);
};

type AllowedTypesKeys = 'string' | 'number' | 'boolean';

export const AllowedTypes: {
  [key in AllowedTypesKeys]: ValidatorFunction;
} & {
  oneOf: ValidatorFunctionCreator;
  breakpointCustomizable: ValidatorFunctionCreator;
  aria: ValidatorFunctionCreator;
} = {
  string: (...args) => validateValueOfType(...args, 'string'),
  number: (...args) => validateValueOfType(...args, 'number'),
  boolean: (...args) => validateValueOfType(...args, 'boolean'),
  oneOf:
    <T>(allowedValues: T[]): ValidatorFunction =>
    (propName, propValue, componentName) => {
      if (!allowedValues.includes(propValue)) {
        printError(propName, propValue, componentName, formatArrayOutput(allowedValues));
      }
    },
  breakpointCustomizable: (allowedValues): ValidatorFunction => {
    return (propName, propValue, componentName) => {
      const value = parseJSON(propValue);
      let isValid = true;

      if (typeof value === 'object') {
        if (
          // check structure
          Object.keys(value).some((key) => !BREAKPOINTS.includes(key as any)) ||
          // check values
          Object.values(value).some((val) => isBreakpointCustomizableValueInvalid(val, allowedValues))
        ) {
          isValid = false;
        }
      } else if (isBreakpointCustomizableValueInvalid(value, allowedValues)) {
        // single
        isValid = false;
      }

      if (!isValid) {
        printError(propName, value, componentName, getBreakpointCustomizableStructureForType(allowedValues));
      }
    };
  },
  aria: <T = keyof AriaAttributes>(allowedAriaAttributes: readonly T[]): ValidatorFunction => {
    return (propName, propValue, componentName) => {
      const ariaAttributes = parseJSONAttribute(propValue);
      if (
        ariaAttributes &&
        Object.keys(ariaAttributes).some((ariaKey) => !allowedAriaAttributes.includes(ariaKey as any))
      ) {
        printError(
          propName,
          ariaAttributes,
          componentName,
          formatObjectOutput(allowedAriaAttributes.reduce((prev, key) => ({ ...prev, [key as any]: 'string' }), {}))
            .replace(/":/g, '"?:')
            .replace(/"/g, "'")
        );
      }
    };
  },
  // TODO: validate object, e.g. aria or sort in p-table-head-cell
};

export type CustomComponentPropTypes<T extends Class<any>> = Required<{
  [Property in keyof Omit<
    InstanceType<T>,
    'host' | FunctionPropertyNames<InstanceType<T>>
  >]: ValidatorFunctionOrCreator;
}>;

export const validateProps = <T extends Class<any>>(
  instance: InstanceType<T>,
  propTypes: CustomComponentPropTypes<T>,
  componentName: string
): void => {
  Object.entries(propTypes).forEach(([propKey, validatorFunc]: [string, ValidatorFunction]) => {
    validatorFunc(propKey, instance[propKey], componentName);
  });
};
