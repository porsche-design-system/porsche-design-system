import { expect, it } from 'vitest';
import { tokensSkill } from '../../../skill/skill';

it('should expose correct tokens package skill', () => {
  const { getContent, ...metadata } = tokensSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
