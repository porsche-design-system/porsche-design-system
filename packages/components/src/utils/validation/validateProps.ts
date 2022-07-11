import { BREAKPOINTS, parseJSON } from '../breakpoint-customizable';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Class<T> = Function & {
  new (...args: any[]): T;
};

type ValidatorFunction = (propName: string, propValue: any, componentName: string) => void;
type ValidatorFunctionCreator = <T>(allowedValues: Extract<AllowedTypesKeys, 'boolean'> | T[]) => ValidatorFunction;
type ValidatorFunctionOrCreator = ValidatorFunction | ValidatorFunctionCreator;

const formatValueOutput = (value: any): string =>
  JSON.stringify(value)
    .replace(/"/g, '')
    .replace(/([,:{\[])/g, '$1 ')
    .replace(/([}\]])/g, ' $1');

const printError = (propName: string, propValue: any, componentName: string, propType: any | any[]): void => {
  propValue = formatValueOutput(propValue);
  propType = formatValueOutput(propType);
  console.error(
    `Warning: Invalid property '${propName}' of value '${propValue}' supplied to '${componentName}, expected one of: ${propType}`
  );
};

const throwIfValueIsNotOfType = (propName: string, propValue: any, componentName: string, propType: string): void => {
  if (propValue !== undefined && typeof propValue !== propType) {
    printError(propName, propValue, componentName, propType);
  }
};

type AllowedTypesKeys = 'string' | 'number' | 'boolean';

export const AllowedTypes: {
  [key in AllowedTypesKeys]: ValidatorFunction;
} & { oneOf: ValidatorFunctionCreator; breakpointCustomizable: ValidatorFunctionCreator } = {
  string: (...args) => throwIfValueIsNotOfType(...args, 'string'),
  number: (...args) => throwIfValueIsNotOfType(...args, 'number'),
  boolean: (...args) => throwIfValueIsNotOfType(...args, 'boolean'),
  oneOf:
    <T>(allowedValues: T[]): ValidatorFunction =>
    (propName, propValue, componentName) => {
      if (!allowedValues.includes(propValue)) {
        printError(propName, propValue, componentName, allowedValues);
      }
    },
  breakpointCustomizable: (allowedValues): ValidatorFunction => {
    return (propName, propValue, componentName) => {
      // true / false type of breakpoint customizable or array containing possible values
      const isBooleanValue = allowedValues === 'boolean';
      const value = parseJSON(propValue);

      if (typeof value === 'object') {
        // check structure
        const invalidKeys = Object.keys(value).filter((key) => !BREAKPOINTS.includes(key as any));
        if (invalidKeys.length) {
          printError(
            propName,
            value,
            componentName,
            BREAKPOINTS.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})
          );
        } else {
          // check values
          Object.values(value).forEach((val) =>
            (isBooleanValue ? AllowedTypes.boolean : AllowedTypes.oneOf(allowedValues))(propName, val, componentName)
          );
        }
      } else {
        // single
        (isBooleanValue ? AllowedTypes.boolean : AllowedTypes.oneOf(allowedValues))(propName, value, componentName);
      }

      // if (!allowedValues.includes(propValue)) {
      //   printError(propName, propValue, componentName, allowedValues);
      // }
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
  Object.entries(propTypes).forEach(([key, validatorFunc]: [string, ValidatorFunction]) => {
    console.log(componentName, key, instance[key]);
    validatorFunc(key, instance[key], componentName);
  });
};
