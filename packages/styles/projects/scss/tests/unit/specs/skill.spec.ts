import { expect, it } from 'vitest';
import { getScssSkill } from '../../../skill/skill';

// Skill seam: lock the skill generator's pure-function output (the scss skill markdown derived from
// `scssMeta`). Unlike the output-parity spec this needs no prior build — `getScssSkill()` is pure.
it('should produce correct scss skill markdown', () => {
  expect(getScssSkill()).toMatchSnapshot();
});
