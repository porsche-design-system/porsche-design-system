import type {
  AlignLabel,
  AlignLabelType,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  LinkTarget,
  PropTypes,
  SelectedAriaAttributes,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../types';
import type { LinkAriaAttributes } from '../link/link-utils';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasSlottedSubline,
  hasVisibleIcon,
  parseAndGetAriaAttributes,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES_EXTENDED_ELECTRIC_DARK,
  throwIfInvalidLinkPureUsage,
  validateProps,
  warnIfParentIsPTextAndIconIsNone,
} from '../../utils';
import { getComponentCss } from './link-pure-styles';

const propTypes: PropTypes<typeof LinkPure> = {
  alignLabel: AllowedTypes.breakpoint<AlignLabelType>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TEXT_WEIGHTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  href: AllowedTypes.string,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  theme: AllowedTypes.oneOf<ThemeExtendedElectricDark>(THEMES_EXTENDED_ELECTRIC_DARK),
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkAriaAttributes>(LINK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-link-pure',
  shadow: { delegatesFocus: true },
})
export class LinkPure {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: AlignLabel = 'right';

  /** Stretches the area between icon and label to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Size of the link. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text (only has effect with visible label). */
  @Prop() public weight?: TextWeight = 'regular';

  /** The icon shown. By choosing 'none', no icon is displayed */
  @Prop() public icon?: LinkButtonPureIconName = 'arrow-head-right';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Display link in active state. */
  @Prop() public active?: boolean = false;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: ThemeExtendedElectricDark = 'light';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public connectedCallback(): void {
    // NOTE: we can't reuse the more precise throwIfInvalidLinkUsage because of subline variations
    throwIfInvalidLinkPureUsage(this.host, this.href);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfParentIsPTextAndIconIsNone(this.host, this.icon);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.active,
      this.stretch,
      this.size,
      this.weight,
      this.hideLabel,
      this.alignLabel,
      hasSlottedSubline(this.host),
      !this.href,
      this.theme
    );

    const hasSubline = hasSlottedSubline(this.host);
    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <TagType
          class="root"
          {...(TagType === 'a' && {
            href: this.href,
            target: this.target,
            download: this.download,
            rel: this.rel,
            ...(hasSubline && { 'aria-describedby': 'subline' }),
            ...parseAndGetAriaAttributes(this.aria),
          })}
        >
          {hasVisibleIcon(this.icon) && (
            <PrefixedTagNames.pIcon
              class="icon"
              color="inherit"
              theme={this.theme}
              size="inherit"
              name={this.icon}
              source={this.iconSource}
              aria-hidden="true"
            />
          )}
          <span class="label">
            <slot />
          </span>
        </TagType>
        {hasSubline && (
          <div id="subline" class="subline">
            <slot name="subline" />
          </div>
        )}
      </Host>
    );
  }
}
