import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { type TagColor, type TagColorDeprecated, type TagIcon, TAG_COLORS } from './tag-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElement,
  getPrefixedTagNames,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './tag-styles';
import type { PropTypes, Theme } from '../../types';

type DeprecationMapType = Record<TagColorDeprecated, Exclude<TagColor, TagColorDeprecated>>;

const propTypes: PropTypes<typeof Tag> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  color: AllowedTypes.oneOf<TagColor>(TAG_COLORS),
  icon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
  iconSource: AllowedTypes.string,
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
@Component({
  tag: 'p-tag',
  shadow: true,
})
export class Tag {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColor = 'background-surface';

  /** The icon shown. */
  @Prop() public icon?: TagIcon; // TODO: shouldn't the default be 'none' to be in sync with e.g. button, link, button-pure and link-pure?

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const hasIcon = !!(this.icon || this.iconSource);
    const deprecationMap: DeprecationMapType = {
      'background-default': 'background-base',
      'neutral-contrast-high': 'primary',
      'notification-neutral': 'notification-info-soft',
      'notification-warning': 'notification-warning-soft',
      'notification-success': 'notification-success-soft',
      'notification-error': 'notification-error-soft',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Tag, TagColorDeprecated, TagColor>(this, 'color', deprecationMap);
    attachComponentCss(
      this.host,
      getComponentCss,
      (deprecationMap[this.color as keyof DeprecationMapType] || this.color) as Exclude<TagColor, TagColorDeprecated>,
      this.compact,
      !!getDirectChildHTMLElement(this.host, 'a,button'),
      hasIcon,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <span>
        {hasIcon && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={this.icon}
            source={this.iconSource}
            color="primary"
            size="x-small"
            theme={this.theme}
            aria-hidden="true"
          />
        )}
        <slot />
      </span>
    );
  }
}
