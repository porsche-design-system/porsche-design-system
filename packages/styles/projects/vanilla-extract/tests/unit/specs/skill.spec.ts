import { expect, it } from 'vitest';
import { getVanillaExtractSkill } from '../../../skill/skill';

// Skill seam: lock the skill generator's pure-function output (the vanilla-extract skill markdown
// derived from `vanillaExtractMeta`). `getVanillaExtractSkill()` is pure, so this needs no prior build.
it('should produce correct vanilla-extract skill markdown', () => {
  expect(getVanillaExtractSkill()).toMatchSnapshot();
});
