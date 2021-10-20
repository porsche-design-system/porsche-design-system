export const throwIfValueIsInvalid = <T>(value: T, allowedValues: readonly T[], propName: string): void => {
  if (!allowedValues.includes(value)) {
    throw new Error(
      `The '${propName}' '${value}' is not supported. Supported '${propName}' values are: ${allowedValues.join(', ')}`
    );
  }
};
