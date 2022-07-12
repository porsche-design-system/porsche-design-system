import { BREAKPOINTS, parseJSON } from '../breakpoint-customizable';
import { AriaAttributes } from '../../aria-types';
import { parseJSONAttribute } from '../json';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Class<T> = Function & {
  new (...args: any[]): T;
};

type ValidatorFunction = (propName: string, propValue: any, componentName: string) => ValidationError;
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

type ValidationError = {
  componentName: string;
  propName: string;
  propValue: string;
  propType: string;
};

const formatObjectOutput = (value: any): string => {
  return JSON.stringify(value)
    .replace(/"([A-z?]+)":/g, '$1:')
    .replace(/([,:{])/g, '$1 ')
    .replace(/(})/g, ' $1')
    .replace(/^"(.+)"$/, '$1');
};

const formatArrayOutput = <T>(value: T[] | readonly T[]): string => {
  return JSON.stringify(value).replace(/'/g, '').replace(/"/g, "'").replace(/,/g, ', ');
};

// TODO: prefixing
const printErrorMessage = ({ propName, propValue, componentName, propType }: ValidationError): void => {
  console.error(
    `Warning: Invalid property '${propName}' with value '${formatObjectOutput(
      propValue
    )}' supplied to '${componentName}', expected one of: ${propType}`
  );
};

const isValueNotOfType = (propValue: any, propType: string): boolean => {
  return propValue !== undefined && typeof propValue !== propType;
};

const validateValueOfType = (
  propName: string,
  propValue: any,
  componentName: string,
  propType: string
): ValidationError => {
  if (isValueNotOfType(propValue, propType)) {
    return { propName, propValue, componentName, propType };
  }
};

const breakpointCustomizableTemplate =
  'value, ' +
  formatObjectOutput(
    BREAKPOINTS.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})
  ).replace(/"/g, '');

const getBreakpointCustomizableStructure = <T>(
  allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[] | readonly T[]
): string => {
  if (allowedValues !== 'boolean') {
    allowedValues = formatArrayOutput(allowedValues).replace('[', '(').replace(']', ')[]').replace(/,/g, ' |') as any;
  }
  return breakpointCustomizableTemplate.replace(/value/g, allowedValues as string);
};

const getAriaStructure = <T>(allowedAriaAttributes: readonly T[]): string => {
  return formatObjectOutput(
    allowedAriaAttributes.reduce(
      (prev, key) => ({
        ...prev,
        [key as any]: 'string',
      }),
      {}
    )
  )
    .replace(/":/g, '"?:')
    .replace(/"/g, "'");
};

const getShapeStructure = <T>(shapeStructure: { [key in keyof T]: ValidatorFunction }) => {
  return formatObjectOutput(
    Object.keys(shapeStructure).reduce((prev, key) => ({ ...prev, [key]: shapeStructure[key].name || 'string' }), {})
  ).replace(/"/g, '');
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
  oneOf: ValidatorFunctionOneOfCreator;
  aria: ValidatorFunctionOneOfCreator;
  breakpointCustomizable: ValidatorFunctionBreakpointCustomizableCreator;
  shape: ValidatorFunctionShapeCreator;
} = {
  string: (...args) => validateValueOfType(...args, 'string'),
  number: (...args) => validateValueOfType(...args, 'number'),
  boolean: (...args) => validateValueOfType(...args, 'boolean'),
  oneOf:
    <T>(allowedValues: T[]): ValidatorFunction =>
    (propName, propValue, componentName) => {
      if (!allowedValues.includes(propValue)) {
        return { propName, propValue, componentName, propType: formatArrayOutput(allowedValues) };
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
        return {
          propName,
          propValue: value + '',
          componentName,
          propType: getBreakpointCustomizableStructure(allowedValues),
        };
      }
    };
  },
  aria: <T = keyof AriaAttributes>(allowedAriaAttributes: readonly T[]): ValidatorFunction => {
    return (propName, propValue, componentName) => {
      const ariaAttributes = parseJSONAttribute<AriaAttributes>(propValue);
      if (
        ariaAttributes &&
        Object.keys(ariaAttributes).some((ariaKey) => !allowedAriaAttributes.includes(ariaKey as any))
      ) {
        return {
          propName,
          propValue: formatObjectOutput(ariaAttributes),
          componentName,
          propType: getAriaStructure(allowedAriaAttributes),
        };
      }
    };
  },
  shape: <T>(shapeStructure: { [key in keyof T]: ValidatorFunction }): ValidatorFunction => {
    return (propName, propValue, componentName) => {
      if (shapeStructure) {
        const shapeKeys = Object.keys(shapeStructure);
        if (
          // check structure
          Object.keys(propValue).some((key) => !shapeKeys.includes(key)) ||
          // check values
          Object.entries(shapeStructure).some(([structureKey, validatorFunc]: [string, ValidatorFunction]) =>
            validatorFunc(structureKey, propValue[structureKey], componentName)
          )
        ) {
          // TODO: more precise inner errors from value validation could be output
          return {
            propName,
            propValue,
            componentName,
            propType: getShapeStructure(shapeStructure),
          };
        }
      }
    };
  },
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
  Object.entries(propTypes)
    .map(([propKey, validatorFunc]: [string, ValidatorFunction]) =>
      validatorFunc(propKey, instance[propKey], componentName)
    )
    .filter((x) => x)
    .forEach(printErrorMessage);
};
