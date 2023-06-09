import { paramCaseToCamelCase } from './paramCaseToCamelCase';

it.each([
  ['p-button', 'pButton'],
  ['arrow-double-down', 'arrowDoubleDown'],
  ['button', 'button'],
  ['pButton', 'pButton'],
])('should for %s return %s', (input, result) => {
  expect(paramCaseToCamelCase(input)).toBe(result);
});
