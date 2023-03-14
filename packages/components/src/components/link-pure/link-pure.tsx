import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import { Component, Element, h, JSX, Prop } from '@stencil/core';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES,
  throwIfInvalidLinkUsage,
  validateProps,
  warnIfParentIsPTextAndIconIsNone,
} from '../../utils';
import type {
  LinkPureAlignLabel,
  LinkPureAriaAttribute,
  LinkPureIcon,
  LinkPureSize,
  LinkPureTarget,
  LinkPureWeight,
} from './link-pure-utils';
import { getComponentCss } from './link-pure-styles';

const propTypes: PropTypes<typeof LinkPure> = {
  alignLabel: AllowedTypes.breakpoint<LinkPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  size: AllowedTypes.breakpoint<LinkPureSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<LinkPureWeight>(TEXT_WEIGHTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  underline: AllowedTypes.boolean,
  href: AllowedTypes.string,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkPureAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-link-pure',
  shadow: { delegatesFocus: true },
})
export class LinkPure {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<LinkPureAlignLabel> = 'right';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<LinkPureSize> = 'small';

  /**
   * The weight of the text (only has effect with visible label).
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public weight?: LinkPureWeight = 'regular';

  /** The icon shown. By choosing 'none', no icon is displayed */
  @Prop() public icon?: LinkPureIcon = 'arrow-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Shows an underline under the label. */
  @Prop() public underline?: boolean = false;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Display link in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkPureTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkPureAriaAttribute>;

  public componentWillLoad(): void {
    throwIfInvalidLinkUsage(this.host, this.href);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfParentIsPTextAndIconIsNone(this.host, this.icon, this.iconSource);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.active,
      this.stretch,
      this.size,
      this.hideLabel,
      this.alignLabel,
      this.underline,
      !this.href,
      this.theme
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
            name={this.icon}
            source={this.iconSource}
            theme={this.theme}
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
