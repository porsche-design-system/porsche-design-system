import { expect, it } from 'vitest';
import { vanillaExtractSkill } from '../../../skill/skill';

it('should expose correct vanilla-extract package skill', () => {
  const { getContent, ...metadata } = vanillaExtractSkill;
  expect({ ...metadata, content: getContent() }).toMatchSnapshot();
});
