import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  THEMES,
  throwIfInvalidLinkUsage,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../utils';
import type { LinkTarget } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import { getComponentCss } from './link-social-styles';

const propTypes: PropTypes<typeof LinkSocial> = {
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  href: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  target: AllowedTypes.string,
  rel: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
};

@Component({
  tag: 'p-link-social',
  shadow: { delegatesFocus: true },
})
export class LinkSocial {
  @Element() public host!: HTMLElement;

  /** The icon shown. */
  @Prop() public icon?: SocialIconName;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Show or hide label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  public componentWillLoad(): void {
    throwIfInvalidLinkUsage(this.host, this.href);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.icon, this.hideLabel, !!this.href, this.theme);
  }

  public render(): JSX.Element {
    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <TagType
        class="root"
        {...(TagType === 'a' && {
          href: this.href,
          target: this.target,
          rel: this.rel,
        })}
      >
        <PrefixedTagNames.pIcon
          class="icon"
          size="inherit"
          name={this.icon}
          source={this.iconSource}
          color="inherit"
          aria-hidden="true"
        />
        <span>
          <slot />
        </span>
      </TagType>
    );
  }
}
