import type { StorefrontTheme } from '@/models/theme';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

/**
 * Patches the provided markup by injecting a theme attribute into themeable Porsche Design System components.
 * Only applies the patch if the theme is not 'light'.
 *
 * @param {string} markup - The original HTML markup as a string.
 * @param {StorefrontTheme} theme - The theme to apply to themeable components. If 'light', no changes are made.
 * @returns {string} The updated markup with the theme applied to themeable components.
 */
export const patchThemeIntoVanillaJsMarkup = (markup: string, theme: StorefrontTheme): string => {
  if (theme !== 'light') {
    return markup.replace(/(<[pP][\w-]+)/g, (_, $tag) => {
      return getComponentMeta($tag.replace(/</g, '') as TagName)?.isThemeable ? `${$tag} theme="${theme}"` : $tag;
    });
  }

  return markup;
};
