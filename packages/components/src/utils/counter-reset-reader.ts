export type CounterResetValue = {
  [key: string]: number;
};

export type Accumulator = {
  buffer: string | null;
  result: CounterResetValue;
};

export const readCounterResetValue = (element: Element): CounterResetValue => {
  const computedStyles = getComputedStyle(element);
  const resetValues = computedStyles.getPropertyValue('counter-reset');
  const resetValuesAsObject = resetValues.split(' ').reduce(
    (accumulator: Accumulator, value: string) =>
      !accumulator.buffer
        ? {
            ...accumulator,
            buffer: value,
          }
        : {
            buffer: null,
            result: {
              ...accumulator.result,
              [accumulator.buffer]: parseInt(value, 10),
            },
          },
    {
      buffer: null,
      result: {},
    }
  );

  return resetValuesAsObject.result;
};
