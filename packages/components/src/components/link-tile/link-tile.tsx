import { Component, Element, type JSX, Prop, h } from '@stencil/core';
import { getSlottedPictureImageStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  type ITileProps,
  LINK_ARIA_ATTRIBUTES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  preventAutoPlayOfSlottedVideoOnPrefersReducedMotion,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-styles';
import {
  LINK_TILE_WEIGHTS,
  type LinkTileAlign,
  type LinkTileAriaAttribute,
  type LinkTileAspectRatio,
  type LinkTileBackground,
  type LinkTileSize,
  type LinkTileTarget,
  type LinkTileWeight,
  sharedTilePropTypes,
} from './link-tile-utils';

const propTypes: PropTypes<typeof LinkTile> = {
  ...sharedTilePropTypes,
  weight: AllowedTypes.breakpoint<LinkTileWeight>(LINK_TILE_WEIGHTS),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkTileAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 */
@Component({
  tag: 'p-link-tile',
  shadow: { delegatesFocus: true },
})
export class LinkTile implements ITileProps {
  @Element() public host!: HTMLElement;

  /** Font size of the description. */
  @Prop() public size?: BreakpointCustomizable<LinkTileSize> = 'medium';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semi-bold';

  /** Adapts the description and link theme when used on light background image. */
  @Prop() public background?: LinkTileBackground = 'dark';

  /** Aspect ratio of the link-tile. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4/3';

  /** Label of the <a />. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of link and description. */
  @Prop() public align?: LinkTileAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the link-tile as compact version with description and link icon only. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** href of the `<a>`. */
  @Prop() public href: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedPictureImageStyles);
  }

  public componentWillLoad(): void {
    preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.size,
      this.weight,
      this.background,
      this.align,
      this.compact,
      this.gradient
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const linkProps = {
      theme: this.background,
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

    const linkPure: JSX.Element = (
      <PrefixedTagNames.pLinkPure
        {...sharedLinkProps}
        {...linkProps}
        key="link-or-button-pure"
        class="link-or-button-pure"
        hideLabel={true}
        icon="arrow-right"
      >
        {this.label}
      </PrefixedTagNames.pLinkPure>
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
          {typeof this.compact === 'boolean' ? (this.compact ? linkPure : link) : [linkPure, link]}
        </div>
      </div>
    );
  }
}
