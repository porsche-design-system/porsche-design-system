import { throwIfPropIsNotOfKind } from './throwIfPropIsNotOfKind';
import * as throwIfPropIsUndefinedUtils from './throwIfPropIsUndefined';

it('should call throwIfPropIsUndefined', () => {
  const spy = jest.spyOn(throwIfPropIsUndefinedUtils, 'throwIfPropIsUndefined').mockImplementation(() => {});
  const element = document.createElement('div');
  const propName = 'name';
  const propValue = 'value';
  element[propName] = propValue;

  throwIfPropIsNotOfKind(element, propName, propValue);

  expect(spy).toBeCalledTimes(1);
});

it('should throw error if prop value does not match expected value', () => {
  const element = document.createElement('div');
  const propName = 'name';
  element[propName] = 'wrong value';

  expect(() => throwIfPropIsNotOfKind(element, propName, 'expected value')).toThrow();
});

it('should not throw error if prop value does match expected value', () => {
  const element = document.createElement('div');
  const propName = 'name';
  const propValue = 'value';
  element[propName] = propValue;

  expect(() => throwIfPropIsNotOfKind(element, propName, propValue)).not.toThrow();
});
