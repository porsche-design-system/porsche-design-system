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
import { TAG_VARIANTS, type TagIcon, type TagVariant } from './tag-utils';

const propTypes: PropTypes<typeof Tag> = {
  variant: AllowedTypes.oneOf<TagVariant>(TAG_VARIANTS),
  icon: AllowedTypes.string,
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

  /** Background color variations. */
  @Prop() public variant?: TagVariant = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: TagIcon = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const hasIcon = this.icon !== 'none' || !!this.iconSource;
    attachComponentCss(
      this.host,
      getComponentCss,
      this.variant,
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
            {...(this.icon !== 'none' && { name: this.icon })}
            source={this.iconSource}
            color="inherit"
            size="x-small"
            aria-hidden="true"
          />
        )}
        <slot />
      </span>
    );
  }
}
