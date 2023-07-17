import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getLinkButtonThemeForIcon,
  getPrefixedTagNames,
  hasVisibleIcon,
  hasPropValueChanged,
  isSsrHydration,
  LINK_BUTTON_VARIANTS,
  parseAndGetAriaAttributes,
  THEMES,
  throwIfInvalidLinkUsage,
  validateProps,
} from '../../utils';
import type {
  BreakpointCustomizable,
  LinkTarget,
  LinkVariant,
  PropTypes,
  SelectedAriaAttributes,
  Theme,
} from '../../types';
import { getComponentCss } from './link-styles';
import type { LinkAriaAttribute, LinkIcon } from './link-utils';
import { LINK_ARIA_ATTRIBUTES } from './link-utils';

const propTypes: PropTypes<typeof Link> = {
  variant: AllowedTypes.oneOf<LinkVariant>(LINK_BUTTON_VARIANTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  href: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<LinkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-link',
  shadow: { delegatesFocus: true },
})
export class Link {
  @Element() public host!: HTMLElement;

  /** The style variant of the link. */
  @Prop() public variant?: LinkVariant = 'primary';

  /** The icon shown. By choosing 'none', no icon is displayed. */
  @Prop() public icon?: LinkIcon = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Adapts the link color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttribute>;

  public componentWillLoad(): void {
    if (!isSsrHydration(this.host)) {
      // when ssr rendered component is partially hydrated before being rerendered by its parent (e.g. link-tile)
      // it has no href prop and no slotted anchor, so validation fails
      throwIfInvalidLinkUsage(this.host, this.href);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.variant,
      this.hideLabel,
      !this.href,
      this.theme
    );

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
          ...parseAndGetAriaAttributes(this.aria),
        })}
      >
        {hasVisibleIcon(this.icon, this.iconSource) && (
          <PrefixedTagNames.pIcon
            class="icon"
            size="inherit"
            name={this.iconSource ? undefined : this.icon}
            source={this.iconSource}
            theme={getLinkButtonThemeForIcon(this.variant, this.theme)}
            aria-hidden="true"
          />
        )}
        <span class="label">
          <slot />
        </span>
      </TagType>
    );
  }
}
