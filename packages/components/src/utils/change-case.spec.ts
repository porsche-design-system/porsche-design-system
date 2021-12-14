import { paramCaseToCamelCase } from './change-case';

describe('paramCaseToCamelCase()', () => {
  it.each([
    ['p-button', 'pButton'],
    ['arrow-double-down', 'arrowDoubleDown'],
    ['button', 'button'],
    ['pButton', 'pButton'],
  ])("should be called with '%s' and return '%s'", (input, result) => {
    expect(paramCaseToCamelCase(input)).toBe(result);
  });
});
