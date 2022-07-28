import {
  getIndexOfStepWithStateCurrent,
  syncItemsProps,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';
import type { StepperHorizontalItemInternalHTMLProps } from '../stepper-horizontal-item/stepper-horizontal-item-utils';
import type { Theme } from '../../../../utils';
import { StepperHorizontalItem } from '../stepper-horizontal-item/stepper-horizontal-item';
import * as stencilCore from '@stencil/core';

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

describe('syncItemsProps()', () => {
  const host = document.createElement('p-stepper-horizontal');
  const child1: HTMLElement & StepperHorizontalItem & StepperHorizontalItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  const child2: HTMLElement & StepperHorizontalItem & StepperHorizontalItemInternalHTMLProps = document.createElement(
    'div'
  ) as any;
  host.append(child1, child2);

  const theme: Theme = 'light';

  it('should set selected, backgroundColor and theme property on every item', () => {
    expect(child1.theme).toBeUndefined();
    expect(child2.theme).toBeUndefined();

    syncItemsProps(host, theme);

    expect(child1.theme).toBe(theme);
    expect(child2.theme).toBe(theme);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncItemsProps(host, theme);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
