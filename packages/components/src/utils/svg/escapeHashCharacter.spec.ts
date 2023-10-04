import { escapeHashCharacter } from './escapeHashCharacter';

it('should replace # character with %23', () => {
  const result = escapeHashCharacter('#fff');
  expect(result).toBe('%23fff');
});
