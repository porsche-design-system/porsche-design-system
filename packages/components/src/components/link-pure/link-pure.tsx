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

  /** Sets the label position relative to the icon — `start` places it before, `end` places it after. Supports responsive breakpoint values. */
  @Prop() public alignLabel?: BreakpointCustomizable<LinkPureAlignLabel> = 'end';

  /** Expands the space between icon and label to fill the full container width. Supports responsive breakpoint values. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Sets the font size of the link label. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<LinkPureSize> = 'sm';

  /** Sets the foreground color of the link's icon and label text. */
  @Prop() public color?: LinkPureColor = 'primary';

  /** Sets the icon displayed next to the label. */
  @Prop() public icon?: LinkPureIcon = 'arrow-right';

  /** Sets a path to a custom SVG icon, used instead of the built-in icon set. */
  @Prop() public iconSource?: string;

  /** Adds a text underline to the label to reinforce its link-like appearance. */
  @Prop() public underline?: boolean = false;

  /** When set, the component renders as an anchor navigating to this URL. Otherwise, provide a slotted anchor element. */
  @Prop() public href?: string;

  /** Visually marks the link as the currently active navigation item, e.g. the current page. */
  @Prop() public active?: boolean = false;

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. */
  @Prop() public target?: LinkPureTarget = '_self';

  /** Sets the native `download` attribute to trigger a file download. Only applies when `href` is set. */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link (e.g. `noopener`). Only applies when `href` is set. */
  @Prop() public rel?: string;

  /** Sets ARIA attributes on the link element to improve accessibility for screen readers. */
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
