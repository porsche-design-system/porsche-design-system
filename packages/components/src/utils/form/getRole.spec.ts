import { getRole } from './getRole';

it('should return "alert" if state is error', () => {
  expect(getRole('error')).toBe('alert');
});

it('should return "status" if state is success', () => {
  expect(getRole('success')).toBe('status');
});

it('should return null if state is none', () => {
  expect(getRole('none')).toBeNull();
});
