import { Component, Element, h, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  parseAndGetAriaAttributes,
  TEXT_SIZES,
  throwIfInvalidLinkPureUsage,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-styles';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes, LinkTarget, TextSize } from '../../types';
import type { LinkAriaAttributes } from '../link/link-utils';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import type { LinkTileAspectRatio, LinkTileAlign, LinkTileWeight } from './link-tile-utils';
import { LINK_TILE_ASPECT_RATIOS, LINK_TILE_ALIGN, LINK_TILE_WEIGHTS } from './link-tile-utils';

const propTypes: PropTypes<typeof LinkTile> = {
  size: AllowedTypes.oneOf<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<LinkTileWeight>(LINK_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileAspectRatio>(LINK_TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<LinkTileAlign>(LINK_TILE_ALIGN),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkAriaAttributes>(LINK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-link-tile',
  shadow: { delegatesFocus: true },
})
export class LinkTile {
  @Element() public host!: HTMLElement;

  /** Font size of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public size?: TextSize = 'inherit';

  /** Font weight of the description. Only to be used if custom size 'inherit' is needed. */
  @Prop() public weight?: LinkTileWeight = 'regular';

  /** Aspect ratio of the link-tile. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4:3';

  /** Label of the <a />. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of link and description. */
  @Prop() public align?: LinkTileAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the tile-link as compact version with description and link icon only. */
  @Prop() public compact?: boolean = false;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttributes>;

  public componentWillLoad(): void {
    throwIfInvalidLinkPureUsage(this.host, this.href);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      !!this.size,
      this.weight,
      this.align,
      this.compact,
      this.gradient
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const anchor: JSX.Element =
      this.href === undefined ? (
        <slot name="link" />
      ) : (
        <a
          class="anchor"
          href={this.href}
          target={this.target}
          download={this.download}
          rel={this.rel}
          {...parseAndGetAriaAttributes(this.aria)}
        >
          {this.label}
        </a>
      );

    return (
      <div class="root">
        <div class="image">
          <slot name="image" />
        </div>
        {/* What Aria attribute for gradient as it is only a graphic container? */}
        <div class="content">
          <p>{this.description}</p>
          {this.compact ? (
            <PrefixedTagNames.pLinkPure class="link" hideLabel="true" icon="arrow-right" theme="dark">
              {anchor}
            </PrefixedTagNames.pLinkPure>
          ) : (
            <PrefixedTagNames.pLink class="link" variant="tertiary" theme="dark">
              {anchor}
            </PrefixedTagNames.pLink>
          )}
        </div>
      </div>
    );
  }
}
