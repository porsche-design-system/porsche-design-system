import { Component, Element, type JSX, Prop, h } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  LINK_ARIA_ATTRIBUTES,
  TEXT_SIZES,
  THEMES,
  TYPOGRAPHY_TEXT_WEIGHTS,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  isSsrHydration,
  parseAndGetAriaAttributes,
  throwIfInvalidLinkUsage,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './link-pure-styles';
import type {
  LinkPureAlignLabel,
  LinkPureAlignLabelDeprecated,
  LinkPureAriaAttribute,
  LinkPureIcon,
  LinkPureSize,
  LinkPureTarget,
  LinkPureWeight,
} from './link-pure-utils';

const propTypes: PropTypes<typeof LinkPure> = {
  alignLabel: AllowedTypes.breakpoint<LinkPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  size: AllowedTypes.breakpoint<LinkPureSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<LinkPureWeight>(TYPOGRAPHY_TEXT_WEIGHTS),
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

    const alignLabelDeprecationMap: Record<
      LinkPureAlignLabelDeprecated,
      Exclude<LinkPureAlignLabel, LinkPureAlignLabelDeprecated>
    > = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof LinkPure, LinkPureAlignLabelDeprecated, LinkPureAlignLabel>(
      this,
      'alignLabel',
      alignLabelDeprecationMap
    );

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
