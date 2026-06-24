import { expect, it } from 'vitest';
import { getStylesheetsSkill } from '../../../skill/skill';

// Skill seam: lock the skill generator's pure-function output (the global-styles skill markdown
// derived from `stylesheetsMeta` + `globalStylesMeta`). `getStylesheetsSkill()` is pure, so this
// needs no prior build.
it('should produce correct stylesheets skill markdown', () => {
  expect(getStylesheetsSkill()).toMatchSnapshot();
});
