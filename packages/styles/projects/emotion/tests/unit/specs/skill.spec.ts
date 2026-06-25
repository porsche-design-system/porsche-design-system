import { expect, it } from 'vitest';
import { getEmotionSkill } from '../../../skill/skill';

// Skill seam: lock the skill generator's pure-function output (the emotion skill markdown derived
// from `emotionMeta`). `getEmotionSkill()` is pure, so this needs no prior build.
it('should produce correct emotion skill markdown', () => {
  expect(getEmotionSkill()).toMatchSnapshot();
});