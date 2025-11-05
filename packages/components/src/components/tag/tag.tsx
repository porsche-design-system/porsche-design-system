import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElement,
  getPrefixedTagNames,
  validateProps,
} from '../../utils';
import { getComponentCss } from './tag-styles';
import { TAG_COLORS, type TagColor, type TagIcon } from './tag-utils';

const propTypes: PropTypes<typeof Tag> = {
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
    attachComponentCss(
      this.host,
      getComponentCss,
      this.color,
      this.compact,
      !!getDirectChildHTMLElement(this.host, 'a,button'),
      hasIcon
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
            aria-hidden="true"
          />
        )}
        <slot />
      </span>
    );
  }
}
