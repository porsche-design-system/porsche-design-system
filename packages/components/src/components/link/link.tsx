import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type {
  BreakpointCustomizable,
  LinkAriaAttribute,
  LinkTarget,
  LinkVariant,
  PropTypes,
  SelectedAriaAttributes,
} from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  isSsrHydration,
  LINK_ARIA_ATTRIBUTES,
  LINK_BUTTON_VARIANTS,
  parseAndGetAriaAttributes,
  throwIfInvalidLinkUsage,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-styles';
import type { LinkIcon } from './link-utils';

const propTypes: PropTypes<typeof Link> = {
  variant: AllowedTypes.oneOf<LinkVariant>(LINK_BUTTON_VARIANTS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  compact: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<LinkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot to render the link label. This slot can be used to slot an anchor tag instead of using the href prop." }
 */
@Component({
  tag: 'p-link',
  shadow: { delegatesFocus: true },
})
export class Link {
  @Element() public host!: HTMLElement;

  /** Sets the visual style variant of the link (e.g. `primary`, `secondary`, `tertiary`). */
  @Prop() public variant?: LinkVariant = 'primary';

  /** Sets the icon displayed next to the link label. Use `none` to show no icon. */
  @Prop() public icon?: LinkIcon = 'none';

  /** Sets a path to a custom SVG icon, used instead of the built-in icon set. */
  @Prop() public iconSource?: string;

  /** When set, the component renders as an anchor navigating to this URL. Otherwise, provide a slotted anchor element. */
  @Prop() public href?: string;

  /** Specifies where to open the linked URL (e.g. `_self`, `_blank`). Only applies when `href` is set. */
  @Prop() public target?: LinkTarget = '_self';

  /** Sets the native `download` attribute to trigger a file download. Only applies when `href` is set. */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link (e.g. `noopener`). Only applies when `href` is set. */
  @Prop() public rel?: string;

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Reduces the link's padding and height for denser layouts. Supports responsive breakpoint values. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Sets ARIA attributes on the link element to improve accessibility for screen readers. */
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
      this.compact
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
            color="inherit"
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
