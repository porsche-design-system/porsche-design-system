import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  parseAndGetAriaAttributes,
} from '../../../utils';
import type {
  SelectedAriaAttributes,
  BreakpointCustomizable,
  IconName,
  LinkTarget,
  LinkVariant,
  ThemeExtendedElectric,
} from '../../../types';
import { getComponentCss } from './link-styles';
import type { LinkAriaAttributes } from './link-utils';
import { LINK_ARIA_ATTRIBUTES } from './link-utils';
import { throwIfInvalidLinkUsage } from '../link-validation';

@Component({
  tag: 'p-link',
  shadow: true,
})
export class Link {
  @Element() public host!: HTMLElement;

  /** The style variant of the link. */
  @Prop() public variant?: LinkVariant = 'secondary';

  /** The icon shown. */
  @Prop() public icon?: IconName = 'arrow-head-right';

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public componentWillLoad(): void {
    throwIfInvalidLinkUsage(this.host, this.href);
    improveFocusHandlingForCustomElement(this.host);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.variant, this.hideLabel, !this.href, this.theme);
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
          download: this.download,
          rel: this.rel,
          ...parseAndGetAriaAttributes(this.aria, LINK_ARIA_ATTRIBUTES),
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
