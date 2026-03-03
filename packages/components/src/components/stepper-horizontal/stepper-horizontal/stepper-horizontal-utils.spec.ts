import { getIndexOfStepWithStateCurrent, throwIfMultipleCurrentStates } from './stepper-horizontal-utils';

describe('getIndexOfStepWithStateCurrent()', () => {
  it('should return correct index', () => {
    const items = [{}, {}, { state: 'current' }];
    expect(getIndexOfStepWithStateCurrent(items as HTMLPStepperHorizontalItemElement[])).toBe(2);
  });

  it('should return -1 when no current state is found', () => {
    const items = [{}, {}, {}];
    expect(getIndexOfStepWithStateCurrent(items as HTMLPStepperHorizontalItemElement[])).toBe(-1);
  });
});

describe('throwIfMultipleCurrentStates()', () => {
  it('should throw error if multiple children have state="current"', () => {
    const stepperHorizontal = document.createElement('p-stepper-horizontal');
    const item1: HTMLPStepperHorizontalItemElement = document.createElement('p-stepper-horizontal-item');
    const item2: HTMLPStepperHorizontalItemElement = document.createElement('p-stepper-horizontal-item');

    item1.state = 'current';
    item2.state = 'current';

    stepperHorizontal.appendChild(item1);
    stepperHorizontal.appendChild(item2);

    expect(() => throwIfMultipleCurrentStates(stepperHorizontal, [item1, item2])).toThrow();
  });

  it('should not throw error if only one child has state="current"', () => {
    const stepperHorizontal = document.createElement('p-stepper-horizontal');
    const item1: HTMLPStepperHorizontalItemElement = document.createElement('p-stepper-horizontal-item');
    const item2: HTMLPStepperHorizontalItemElement = document.createElement('p-stepper-horizontal-item');

    item1.state = 'current';

    stepperHorizontal.appendChild(item1);
    stepperHorizontal.appendChild(item2);

    expect(() => throwIfMultipleCurrentStates(stepperHorizontal, [item1, item2])).not.toThrow();
  });
});
