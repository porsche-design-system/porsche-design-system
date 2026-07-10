import { expect, it } from 'vitest';
import { getTailwindcssSkill } from '../../../skill/skill';

// Skill seam: lock the skill generator's pure-function output (the Tailwind skill markdown derived
// from `tailwindMeta`). `getTailwindcssSkill()` is pure, so this needs no prior build.
it('should produce correct tailwindcss skill markdown', () => {
  expect(getTailwindcssSkill()).toMatchSnapshot();
});
