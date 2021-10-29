export const throwIfValueIsInvalid = <T>(value: T, allowedValues: readonly T[], propName: string): void => {
  if (!allowedValues.includes(value)) {
    throw new Error(
      `The value '${value}' for '${propName}' is not supported. Supported values are: ${allowedValues.join(', ')}`
    );
  }
};
