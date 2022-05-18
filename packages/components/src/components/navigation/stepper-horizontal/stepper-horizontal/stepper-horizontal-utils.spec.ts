import { getIndexOfStepWithStateCurrent } from './stepper-horizontal-utils';

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
