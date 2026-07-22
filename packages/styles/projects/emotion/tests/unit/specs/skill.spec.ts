import { expect, it } from 'vitest';
import { emotionSkill } from '../../../skill/skill';

it('should expose correct emotion package skill', () => {
  const { getContent, ...metadata } = emotionSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
