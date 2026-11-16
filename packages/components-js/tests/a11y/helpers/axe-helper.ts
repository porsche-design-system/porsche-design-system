import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { createAxeTest } from '@porsche-design-system/testing/axe';

const deprecatedComponents = (TAG_NAMES as unknown as TagName[]).filter((tagName) => {
  const { isDeprecated } = getComponentMeta(tagName);
  return isDeprecated;
});

export const test = createAxeTest({
  include: '#app',
  exclude: `:is(.skip-axe-core-test, ${deprecatedComponents.map((component) => {
    return component + ',my-prefix-' + component;
  })})`,
  // disable some "best-practice" rules referring to general page compliance which is not needed because only components itself are tested
  disableRules: [
    'region',
    'landmark-one-main',
    'page-has-heading-one',
    'landmark-unique',
    'heading-order',
    // anchor links (e.g. `p-drilldown-link` with `href="#..."`) have no in-page target when components are tested in isolation
    'skip-link',
  ],
});
export { expect } from '@playwright/test';
