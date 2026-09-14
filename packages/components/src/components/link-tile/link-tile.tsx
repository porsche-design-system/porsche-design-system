import { Component, Element, h, type JSX, Prop, State } from '@stencil/core';
import { getSlottedPictureImageStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  hasPropValueChanged,
  type ITileProps,
  LINK_ARIA_ATTRIBUTES,
  preventAutoPlayOfSlottedVideoOnPrefersReducedMotion,
  TILE_WEIGHTS,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-styles';
import {
  getParsedTileCompact,
  type LinkTileAlign,
  type LinkTileAriaAttribute,
  type LinkTileAspectRatio,
  type LinkTileSize,
  type LinkTileTarget,
  type LinkTileWeight,
  sharedTilePropTypes,
} from './link-tile-utils';

const propTypes: PropTypes<typeof LinkTile> = {
  ...sharedTilePropTypes,
  weight: AllowedTypes.breakpoint<LinkTileWeight>(TILE_WEIGHTS),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkTileAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "footer", "description": "Renders a footer section below the description." }
 */
@Component({
  tag: 'p-link-tile',
  shadow: { delegatesFocus: true },
})
export class LinkTile implements ITileProps {
  @Element() public host!: HTMLElement;

  /** Sets the font size of the description text in the tile content area. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<LinkTileSize> = 'medium';

  /** Sets the font weight of the description text in the tile content area. Supports responsive breakpoint values. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semi-bold';

  /** Sets the width-to-height ratio of the tile media area. Supports responsive breakpoint values. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4/3';

  /** Sets the accessible label text of the link rendered inside the tile. */
  @Prop() public label: string;

  /** Sets the description text displayed in the tile's content area. */
  @Prop() public description: string;

  /** Controls the vertical placement of the description and link — `top` or `bottom`. */
  @Prop() public align?: LinkTileAlign = 'bottom';

  /** Shows a gradient overlay over the media slot to improve text legibility on bright images or videos. */
  @Prop() public gradient?: boolean = false;

  /** Renders only the icon link without the full label. Supports responsive breakpoint values. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Sets the URL the tile's anchor element navigates to when clicked. */
  @Prop() public href: string;

  /** Specifies where to open the linked URL (e.g. `_self`, `_blank`). */
  @Prop() public target?: LinkTileTarget = '_self';

  /** Sets the native `download` attribute to trigger a file download. */
  @Prop() public download?: string;

  /** Sets the `rel` attribute on the link (e.g. `noopener`). */
  @Prop() public rel?: string;

  /** Sets ARIA attributes on the tile's anchor element to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;

  @State() private hasFooterSlot: boolean = false;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedPictureImageStyles);
  }

  public componentWillLoad(): void {
    preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host);
    this.updateSlotObserver();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const parsedCompact = getParsedTileCompact(this.compact);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.size,
      this.weight,
      this.align,
      parsedCompact,
      this.gradient,
      this.hasFooterSlot
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const linkProps = {
      variant: 'secondary',
      aria: this.aria,
    };

    const sharedLinkProps = {
      href: this.href,
      target: this.target,
      download: this.download,
      rel: this.rel,
    };

    const link: JSX.Element = (
      <PrefixedTagNames.pLink {...sharedLinkProps} {...linkProps} key="link-or-button" class="link-or-button">
        {this.label}
      </PrefixedTagNames.pLink>
    );

    const linkCompact: JSX.Element = (
      <PrefixedTagNames.pLink
        {...sharedLinkProps}
        {...linkProps}
        hideLabel={true}
        icon="arrow-right"
        key="link-or-button-pure"
        compact={true}
        class="link-or-button-pure"
      >
        {this.label}
      </PrefixedTagNames.pLink>
    );

    return (
      <div class="root">
        <a {...sharedLinkProps} tabIndex={-1} aria-hidden="true" />
        <slot name="header" />
        <div class="media">
          <slot onSlotchange={() => preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host)} />
        </div>
        <div class="footer">
          <p>{this.description}</p>
          <slot name="footer" onSlotchange={this.updateSlotObserver} />
          {typeof parsedCompact === 'boolean' ? (parsedCompact ? linkCompact : link) : [linkCompact, link]}
        </div>
      </div>
    );
  }

  private updateSlotObserver = (): void => {
    this.hasFooterSlot = hasNamedSlot(this.host, 'footer');
  };
}
