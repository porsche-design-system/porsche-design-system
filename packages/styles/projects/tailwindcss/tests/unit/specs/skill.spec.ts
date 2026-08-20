import { expect, it } from 'vitest';
import { tailwindcssSkill } from '../../../skill/skill';

it('should expose correct tailwindcss package skill', () => {
  const { getContent, ...metadata } = tailwindcssSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
