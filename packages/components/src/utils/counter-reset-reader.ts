export interface CounterResetValue {
  [key: string]: number;
}

export interface Accumulator {
  buffer: string | null;
  result: CounterResetValue;
}

export const readCounterResetValue = (element: Element): CounterResetValue => {
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
        [accumulator.buffer]: parseInt(value, 10)
      }
    };
  }, {
    buffer: null,
    result: {}
  });

  return resetValuesAsObject.result;
};
