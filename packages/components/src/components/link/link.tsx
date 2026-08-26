import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type {
  BreakpointCustomizable,
  LinkAriaAttribute,
  LinkTarget,
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
  parseAndGetAriaAttributes,
  setCustomStates,
  throwIfInvalidLinkUsage,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-styles';
import { LINK_VARIANTS, type LinkIcon, type LinkVariant } from './link-utils';

const propTypes: PropTypes<typeof Link> = {
  variant: AllowedTypes.oneOf<LinkVariant>(LINK_VARIANTS),
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

  /** Sets the visual style variant of the link (`primary` or `secondary`). */
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

  private internals: ElementInternals | undefined;

  public connectedCallback(): void {
    // ElementInternals is attached manually instead of using Stencil's @AttachInternals() decorator,
    // since the decorator requires the component to be form-associated which isn't the case for a link.
    // Custom states are a progressive enhancement, therefore environments without support are silently skipped.
    if (!this.internals) {
      try {
        this.internals = this.host.attachInternals?.();
      } catch {
        // ElementInternals is not supported or was already attached, nothing to do
      }
    }
  }

  public componentWillLoad(): void {
    if (!isSsrHydration(this.host)) {
      // when ssr rendered component is partially hydrated before being rerendered by its parent (e.g. link-tile)
      // it has no href prop and no slotted anchor, so validation fails
      throwIfInvalidLinkUsage(this.host, this.href);
    }
  }

  public componentWillRender(): void {
    this.syncCustomStates();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  /**
   * Exposes the component's state as CSS custom states, which can be targeted with the `:state()` pseudo-class,
   * e.g. `p-link:state(variant-secondary) { --p-link-bg: deeppink; }`.
   * This is a progressive enhancement and silently does nothing in browsers without `CustomStateSet` support.
   */
  private syncCustomStates(): void {
    const states: Record<string, boolean> = {};

    for (const variant of LINK_VARIANTS) {
      states[`variant-${variant}`] = this.variant === variant;
    }

    setCustomStates(this.internals, states);
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
