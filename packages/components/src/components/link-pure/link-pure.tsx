import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  isSsrHydration,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  throwIfInvalidLinkUsage,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-pure-styles';
import {
  LINK_PURE_COLORS,
  LINK_PURE_SIZES,
  type LinkPureAlignLabel,
  type LinkPureAriaAttribute,
  type LinkPureColor,
  type LinkPureIcon,
  type LinkPureSize,
  type LinkPureTarget,
} from './link-pure-utils';

const propTypes: PropTypes<typeof LinkPure> = {
  alignLabel: AllowedTypes.breakpoint<LinkPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  size: AllowedTypes.breakpoint<LinkPureSize>(LINK_PURE_SIZES),
  color: AllowedTypes.oneOf<LinkPureColor>(LINK_PURE_COLORS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  underline: AllowedTypes.boolean,
  href: AllowedTypes.string,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkPureAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot to render the link label." }
 */
@Component({
  tag: 'p-link-pure',
  shadow: { delegatesFocus: true },
})
export class LinkPure {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<LinkPureAlignLabel> = 'end';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<LinkPureSize> = 'sm';

  /** The color. */
  @Prop() public color?: LinkPureColor = 'primary';

  /** The icon shown. By choosing 'none', no icon is displayed */
  @Prop() public icon?: LinkPureIcon = 'arrow-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Shows an underline under the label. */
  @Prop() public underline?: boolean = false;

  /** When `href` is provided, the component renders as an `<a>` element. */
  @Prop() public href?: string;

  /** Displays the link in its active state. */
  @Prop() public active?: boolean = false;

  /** Shows or hides the label. For better accessibility, it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Specifies where to open the linked document. */
  @Prop() public target?: LinkPureTarget = '_self';

  /** Sets the native `download` attribute when the target URL points to a downloadable file. */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link. */
  @Prop() public rel?: string;

  /** Sets ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkPureAriaAttribute>;

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
      this.active,
      this.stretch,
      this.size,
      this.color,
      this.hideLabel,
      this.alignLabel,
      this.underline,
      !this.href
    );

    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const hasIcon = hasVisibleIcon(this.icon, this.iconSource);

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
        {hasIcon && (
          <PrefixedTagNames.pIcon
            class="icon"
            size="inherit"
            color="inherit"
            name={this.icon}
            source={this.iconSource}
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
