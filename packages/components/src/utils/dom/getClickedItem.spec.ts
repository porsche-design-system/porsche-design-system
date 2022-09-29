import { getClickedItem } from './getClickedItem';

const host = document.createElement('p-stepper-horizontal');
const prefixedHost = document.createElement('some-prefix-p-stepper-horizontal');
const div = document.createElement('div');
const span = document.createElement('span');
const slot = document.createElement('slot');
const p = document.createElement('p');

it('should return undefined if no p-stepper-horizontal-item is found', () => {
  expect(getClickedItem(host, 'p-stepper-horizontal-item', [host])).toBeUndefined();
  expect(getClickedItem(host, 'p-stepper-horizontal-item', [div, span, slot, p])).toBeUndefined();
});

it('should return p-stepper-horizontal-item if it is found', () => {
  const stepperHorizontalItem = document.createElement('p-stepper-horizontal-item');
  expect(getClickedItem(host, 'p-stepper-horizontal-item', [div, span, stepperHorizontalItem, slot, p])).toBe(
    stepperHorizontalItem
  );
});

it('should return prefixed p-stepper-horizontal-item if it is found', () => {
  const prefixedStepperHorizontalItem = document.createElement('some-prefix-p-stepper-horizontal-item');
  expect(
    getClickedItem(prefixedHost, 'p-stepper-horizontal-item', [div, span, prefixedStepperHorizontalItem, slot, p])
  ).toBe(prefixedStepperHorizontalItem);
});
