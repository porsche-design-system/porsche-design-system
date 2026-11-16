import { createAxeTest } from '@porsche-design-system/testing/axe';

export const test = createAxeTest({
  exclude: 'iframe',
  // rule is disabled due to unwanted refactorings in component presentation
  disableRules: ['landmark-unique'],
});
export { expect } from '@playwright/test';
