export type CounterResetValue = {
  [key: string]: number;
};

export type Accumulator = {
  buffer: string | null,
  result: CounterResetValue
};
export function readCounterResetValue(element: Element): CounterResetValue {
  const computedStyles = window.getComputedStyle(element);
  const resetValues = computedStyles.getPropertyValue('counter-reset');
  const resetValuesAsObject = resetValues.split(' ').reduce((accumulator: Accumulator, value: string) => {
    if (!accumulator.buffer) {
      return {
        ...accumulator,
        buffer: value
      };
    }

    return {
      buffer: null,
      result: {
        ...accumulator.result,
        [accumulator.buffer]: parseInt(value)
      }
    };
  }, {
    buffer: null,
    result: {}
  });

  return resetValuesAsObject.result;
}
