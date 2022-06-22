import { throwIfValueIsInvalid } from './throwIfValueIsInvalid';

it('should throw exception if value is not in supported values', () => {
  const func = () => {
    throwIfValueIsInvalid('foo', ['bar', 'xy'], 'someProp');
  };

  expect(func).toThrowErrorMatchingSnapshot();
});

it('should not throw exception if value is in supported values', () => {
  const func = () => {
    throwIfValueIsInvalid('foo', ['foo', 'bar'], 'someProp');
  };

  expect(func).not.toThrow();
});
