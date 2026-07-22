import { expect, it } from 'vitest';
import { scssSkill } from '../../../skill/skill';

it('should expose correct scss package skill', () => {
  const { getContent, ...metadata } = scssSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
