import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { attachConstructedCss, getPrefixedTagNames, improveFocusHandlingForCustomElement } from '../../../utils';
import type { BreakpointCustomizable, LinkTarget, Theme } from '../../../types';
import type { SocialIconName } from './link-social-utils';
import { getComponentCss } from './link-social-styles';

@Component({
  tag: 'p-link-social',
  shadow: true,
})
export class LinkSocial {
  @Element() public host!: HTMLElement;

  /** The icon shown. */
  @Prop() public icon?: SocialIconName;

  /** A custom URL path to a custom social icon. */
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

  public connectedCallback(): void {
    improveFocusHandlingForCustomElement(this.host);
  }

  public componentWillRender(): void {
    attachConstructedCss(this.host, getComponentCss, this.icon, this.hideLabel, !!this.href, this.theme);
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
        <PrefixedTagNames.pText tag="span" color="inherit" class="label">
          <slot />
        </PrefixedTagNames.pText>
      </TagType>
    );
  }
}
