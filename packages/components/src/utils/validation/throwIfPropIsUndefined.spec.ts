import { throwIfPropIsUndefined } from './throwIfPropIsUndefined';

const element = document.createElement('div');

it('should throw exception if value is undefined', () => {
  const func = () => {
    throwIfPropIsUndefined(element, 'someProp', undefined);
  };

  expect(func).toThrowErrorMatchingSnapshot();
});

it.each([null, '', true, false, 1, 0, 'test'])('should not throw exception for value: %o', (value) => {
  const func = () => {
    throwIfPropIsUndefined(element, 'someProp', value);
  };

  expect(func).not.toThrow();
});
